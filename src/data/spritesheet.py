import cv2
import numpy as np
import json

def gen_css_rule(classname, x, y, width, height, percentage):
  return {
    'name': classname,
    'x': ' -' + str(x * percentage) + 'px',
    'y': ' -' + str(y * percentage) + 'px',
    'width': ' ' + str(width * percentage) + 'px',
    'height': ' ' + str(height * percentage) + 'px'
  }


def gen_css_file(filename, spritesheet, width, height, percentage, rules):
  with open(filename, 'w') as f:
    for rule in rules:
      f.write(rule['name'])
      f.write('{')
      f.write('background: url(\'' + spritesheet + '\')' + rule['x'] + rule['y'] + ';')
      f.write('background-size: ' + str(width * percentage) + 'px ' + str(height * percentage) + 'px;')
      f.write('width:' + rule['width'] + ';')
      f.write('height:' + rule['height'] + ';')
      f.write('}')
  f.close()


def gen_image_list(json_file):
  image_list = []
  with open(json_file, encoding="utf8") as f:
    data = json.load(f)
    for key in data:
      image_list.append((key, data[key]['image']['full']))
  f.close()
  return image_list


def gen_spritesheet(col, directory, image_list, write_to, css_filename, 
                    class_prefix, spritesheet_filepath, size_percentage=1):
  css_rules = []

  col_index, row_index = 0, 0
  image_row, image_col = [], []
  for key, image in image_list:
    img = cv2.imread(directory + image)
    image_col.append(img)

    css_rules.append(
      gen_css_rule(
        class_prefix + str(key),
        col_index * img.shape[1],
        row_index * img.shape[0],
        img.shape[1],
        img.shape[0],
        size_percentage
      )
    )

    col_index += 1
    if col_index >= col:
      image_row.append(image_col)
      image_col = []
      col_index = 0
      row_index += 1
  image_row.append(image_col)
 
  width, last_row_width = 0, 0
  last_row_height = 0
  for img in image_row[-1]:
    last_row_width += img.shape[1]
    last_row_height = img.shape[0]
  for img in image_row[0]:
    width += img.shape[1]
  col_padding = width - last_row_width
  row_padding = last_row_height
  padding = np.zeros([row_padding, col_padding, 3], np.uint8)
  image_row[-1].append(padding)

  width, height = 0, 0
  for imgs in image_row:
    height += imgs[0].shape[0]
  for img in image_row[0]:
    width += img.shape[1]

  gen_css_file(
    css_filename, spritesheet_filepath, width, 
    height, size_percentage, css_rules
  )

  spritesheet = cv2.vconcat([cv2.hconcat(col) for col in image_row])
  cv2.imwrite(write_to, spritesheet)


def main():
  champion_image_list = gen_image_list('championLookup.json')
  item_image_list     = gen_image_list('itemLookup.json')
  summoner_image_list = gen_image_list('summonerLookup.json')

  gen_spritesheet(
    10, '../../resources/champion/', champion_image_list, 'champion_spritesheet.png', 
    '../stylesheets/champion_spritesheet.css', '.champion-', '../data/champion_spritesheet.png')

  gen_spritesheet(
    10, '../../resources/item/', item_image_list, 'item_spritesheet.png', 
    '../stylesheets/item_spritesheet.css', '.item-', '../data/item_spritesheet.png')

  gen_spritesheet(
    10, '../../resources/spell/', summoner_image_list, 'summoner_spritesheet.png', 
    '../stylesheets/summoner_spritesheet.css', '.summoner-', '../data/summoner_spritesheet.png')


if __name__ == '__main__':
  main()