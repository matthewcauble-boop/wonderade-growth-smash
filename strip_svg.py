import re
import os

input_file = '/Users/caublestone/Downloads/wonderade_logo (1).txt'
output_file = '/Users/caublestone/.gemini/antigravity/scratch/wonderade-growth-smash/public/wonderade-logo.svg'

def strip_icc_profile():
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    print(f"Original size: {len(content)} bytes")
    
    # Strip <color-profile ... />
    content = re.sub(r'<color-profile[^>]*/>', '', content, flags=re.DOTALL)
    # Strip <color-profile ...> ... </color-profile>
    content = re.sub(r'<color-profile[^>]*>.*?</color-profile>', '', content, flags=re.DOTALL)
    
    print(f"New size: {len(content)} bytes")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Clean SVG saved.")

if __name__ == '__main__':
    if os.path.exists(input_file):
        strip_icc_profile()
    else:
        print(f"Error: {input_file} not found")
