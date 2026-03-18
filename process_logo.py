import sys
from PIL import Image, ImageOps

img = Image.open('/Users/caublestone/.gemini/antigravity/brain/419d6c29-bad4-4b87-b26a-ae97235b3ccc/media__1772473046076.png').convert("RGBA")
luminance = img.convert("L")
alpha = ImageOps.invert(luminance)
solid_color = Image.new("RGBA", img.size, (34, 34, 34, 0)) # Using dark charcoal
final = Image.merge("RGBA", (solid_color.split()[0], solid_color.split()[1], solid_color.split()[2], alpha))

# Calculate bounding box of non-transparent pixels
bbox = final.getbbox()
if bbox:
    # Crop the image to the bounding box to remove excess white space
    final = final.crop(bbox)

final.save('/Users/caublestone/.gemini/antigravity/scratch/wonderade-growth-smash/public/wonderade-logo.png', "PNG")
print("Done")
