import os
from PIL import Image
from rembg import remove

def process():
    input_dir = r"c:\Users\Valued Customer\.gemini\antigravity\brain\42759161-721e-404f-a820-02405d526031"
    output_dir = r"c:\Users\Valued Customer\OneDrive\Documents\wonderade\wonderade-growth-smash\public\assets\packaging"
    
    os.makedirs(output_dir, exist_ok=True)
    
    images = [
        "media__1774469838554.png",
        "media__1774469838587.png"
    ]
    
    # We will look at the color of the output to name them appropriately
    for idx, img_name in enumerate(images):
        in_path = os.path.join(input_dir, img_name)
        
        with open(in_path, 'rb') as i:
            with open("temp.png", 'wb') as o:
                in_data = i.read()
                out_data = remove(in_data)
                o.write(out_data)
                
        # Determine average color to name correctly
        img = Image.open("temp.png")
        img = img.convert("RGBA")
        
        # Calculate average color in center to differentiate Princess Punch (pink) and Major Orange (orange/teal)
        w, h = img.size
        center_color = img.crop((w//2 - 50, h//2 - 50, w//2 + 50, h//2 + 50)).resize((1,1)).getpixel((0,0))
        r, g, b, a = center_color
        
        # Major orange: more teal (g>r, b>r) or orange
        # princess punch: pink (r>b, r>g, b>g)
        if r > 150 and b > 100 and r > g + 20: 
            # likely pink/princess punch
            out_name = "princess-punch-bottle.png"
        else:
            out_name = "major-orange-bottle.png"
            
        final_path = os.path.join(output_dir, out_name)
        img.save(final_path)
        print(f"Processed {img_name} -> {final_path} (Center Color: {r}, {g}, {b})")

if __name__ == '__main__':
    process()
