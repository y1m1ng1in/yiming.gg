import cv2
import numpy as np
import json
import argparse

def gen_css_rule(classname, x, y, width, height, percentage):
  return {
    'name': classname,
    'x': ' -' + str(x * percentage) + 'px',
    'y': ' -' + str(y * percentage) + 'px',
    'width': ' ' + str(width * percentage) + 'px',
    'height': ' ' + str(height * percentage) + 'px'
  }


def gen_css_file(filename, spritesheet, width, height, 
                 percentage, rules, responsive_768, responsive_768_rules):
  with open(filename, 'w') as f:
    f.write('/* Copyright (c) 2020 Yiming Lin, all rights reserved. */\n\n')
    f.write('/* This file is generated by spritesheet.py.')
    f.write('Copyright (c) 2020 Yiming Lin, all rights reserved. <yl6@pdx.edu> */\n\n')
    for rule in rules:
      f.write(rule['name'])
      f.write('{')
      f.write('background: url(\'' + spritesheet + '\')' + rule['x'] + rule['y'] + ';')
      f.write('background-size: ' + str(width * percentage) + 'px ' + str(height * percentage) + 'px;')
      f.write('width:' + rule['width'] + ';')
      f.write('height:' + rule['height'] + ';')
      f.write('}')
    f.write('@media (max-width: 1023px) and (min-width: 768px) {')
    for rule in responsive_768_rules:
      f.write(rule['name'])
      f.write('{')
      f.write('background: url(\'' + spritesheet + '\')' + rule['x'] + rule['y'] + ';')
      f.write('background-size: ' + str(width * responsive_768) + 'px ' + str(height * responsive_768) + 'px;')
      f.write('width:' + rule['width'] + ';')
      f.write('height:' + rule['height'] + ';')
      f.write('}')
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


def gen_icon_image_list():
  image_names = [
    'mostBearDamage.png', 'mostDamageIcon.png', 
    'mostGoldEarned.png', 'mostKills.png'
  ]
  key = ['bear', 'damage', 'gold', 'kill']
  return zip(key, image_names)

def gen_rank_list():
  image_names = [
    'Emblem_Bronze.png', 'Emblem_Challenger.png', 'Emblem_Diamond.png',
    'Emblem_Gold.png', 'Emblem_grandmaster.png', 'Emblem_Iron.png',
    'Emblem_Master.png', 'Emblem_Platinum.png', 'Emblem_Silver.png',
  ]
  key = ['BRONZE', 'CHALLENGER','DIAMOND','GOLD','GRANDMASTER','IRON',
    'MASTER','PLATINUM','SILVER']
  return zip(key, image_names)

def gen_perk_image_list(rune):
  image_list = []
  with open('perkLookup.json', encoding="utf8") as f:
    data = json.load(f)
    for key in data:
      if ((data[key]['rune'] == False and rune == False) or
          (data[key]['rune'] == True and rune == True)):
        image_list.append((key, data[key]['image']))
  f.close()
  return image_list


def gen_spritesheet(col, directory, image_list, write_to, css_filename, 
                    class_prefix, spritesheet_filepath, image_size, 
                    size_percentage=1, responsive_768=1, write_spritesheet_map=False):
  css_rules = []
  css_responsive_768_rules = []
  champion_id_map = []

  col_index, row_index = 0, 0
  image_row, image_col = [], []
  first_image_channel = 0
  champion_id_map_row = []
  for key, image in image_list:
    img = cv2.imread(directory + image, cv2.IMREAD_UNCHANGED)
    if first_image_channel == 0:
      first_image_channel = img.shape[2]
    if img.shape[0] != image_size[0] or img.shape[1] != image_size[1]:
      img = cv2.resize(img, image_size)
    image_col.append(img)
    champion_id_map_row.append(key)
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

    css_responsive_768_rules.append(
      gen_css_rule(
        class_prefix + str(key),
        col_index * img.shape[1],
        row_index * img.shape[0],
        img.shape[1],
        img.shape[0],
        responsive_768
      )
    )

    col_index += 1
    if col_index >= col:
      image_row.append(image_col)
      image_col = []
      col_index = 0
      row_index += 1
      champion_id_map.append(champion_id_map_row)
      champion_id_map_row = []
  image_row.append(image_col)
  champion_id_map.append(champion_id_map_row)
 
  width, last_row_width = 0, 0
  last_row_height = 0
  for img in image_row[-1]:
    last_row_width += img.shape[1]
    last_row_height = img.shape[0]
  for img in image_row[0]:
    width += img.shape[1]
  col_padding = width - last_row_width
  row_padding = last_row_height
  if col_padding > 0:
    padding = np.zeros([row_padding, col_padding, first_image_channel], np.uint8)
    image_row[-1].append(padding)

  width, height = 0, 0
  for imgs in image_row:
    height += imgs[0].shape[0]
  for img in image_row[0]:
    width += img.shape[1]

  gen_css_file(
    css_filename, spritesheet_filepath, width, 
    height, size_percentage, css_rules, responsive_768, css_responsive_768_rules
  )

  spritesheet = cv2.vconcat([cv2.hconcat(col) for col in image_row])
  cv2.imwrite(write_to, spritesheet)

  if write_spritesheet_map:
    with open("spritesheet_champion_id_mapping.json", 'w') as f:
      json.dump(champion_id_map, f)
    f.close()


def main():
  champion_image_list = gen_image_list('championLookup.json')
  item_image_list     = gen_image_list('itemLookup.json')
  summoner_image_list = gen_image_list('summonerLookup.json')
  match_icon_list     = gen_icon_image_list()
  perk_image_list     = gen_perk_image_list(False)
  rune_image_list     = gen_perk_image_list(True)
  rank_image_list     = gen_rank_list()

  parser = argparse.ArgumentParser(
    description='Generate spritesheets and corresponding css files')
  
  parser.add_argument(
    '--champion-css', '-c', type=str, default="champion_spritesheet.css",
    help="the name of the output css for champion spritesheet")

  parser.add_argument(
    '--item-css', '-i', type=str, default="item_spritesheet.css",
    help="the name of the output css for item spritesheet")

  parser.add_argument(
    '--summoner-css', '-s', type=str, default="summoner_spritesheet.css",
    help="the name of the output css for summoner spell spritesheet")

  parser.add_argument(
    '--match-icon-css', '-m', type=str, default="match_icon_spritesheet.css",
    help="the name of the output css for match icon spritesheet")

  parser.add_argument(
    '--perk-css', type=str, default="perk_spritesheet.css",
    help="the name of the output css for perk spritesheet")

  parser.add_argument(
    '--rune-css', type=str, default="rune_spritesheet.css",
    help="the name of the output css for rune spritesheet")

  parser.add_argument(
    '--rank-css', type=str, default="rank_spritesheet.css",
    help="the name of the output css for rank spritesheet")

  parser.add_argument(
    '--prefix', '-p', type=str, default="",
    help="add prefix for each css rules"
  )

  parser.add_argument(
    '--size', '-S', type=float, default=1.0,
    help="percentage resize spritesheet"
  )

  parser.add_argument(
    '--exclude-champion', action="store_true",
    help="do not generate champion")

  parser.add_argument(
    '--exclude-item', action="store_true",
    help="do not generate item")
  
  parser.add_argument(
    '--exclude-summoner', action="store_true",
    help="do not generate summoner")

  parser.add_argument(
    '--exclude-match-icon', action="store_true",
    help="do not generate match icon")

  parser.add_argument(
    '--exclude-rune', action="store_true",
    help="do not generate rune")

  parser.add_argument(
    '--exclude-perk', action="store_true",
    help="do not generate perk")
  
  parser.add_argument(
    '--exclude-rank', action="store_true")

  parser.add_argument(
    '--responsive-768', type=float, default=1.0,
    help="responsive size at 768px to 1023px")

  args = parser.parse_args()
  
  champion_css   = '../stylesheets/' + args.champion_css
  item_css       = '../stylesheets/' + args.item_css
  summoner_css   = '../stylesheets/' + args.summoner_css
  match_icon_css = '../stylesheets/' + args.match_icon_css
  perk_css       = '../stylesheets/' + args.perk_css
  rune_css       = '../stylesheets/' + args.rune_css 
  rank_css       = '../stylesheets/' + args.rank_css
  
  champion_css_prefix   = '.champion-' + args.prefix + '-'
  item_css_prefix       = '.item-' + args.prefix + '-'
  summoner_css_prefix   = '.summoner-' + args.prefix + '-'
  match_icon_css_prefix = '.match-icon-' + args.prefix + '-'
  perk_css_prefix       = '.perk-' + args.prefix + '-'
  rune_css_prefix       = '.rune-' + args.prefix + '-'
  rank_css_prefix       = '.rank-' + args.prefix + '-'

  exclude_champion   = args.exclude_champion
  exclude_item       = args.exclude_item
  exclude_summoner   = args.exclude_summoner
  exclude_match_icon = args.exclude_match_icon
  exclude_perk       = args.exclude_perk
  exclude_rune       = args.exclude_rune
  exclude_rank       = args.exclude_rank
  responsive_768     = args.responsive_768

  percentage = args.size

  if not exclude_champion:
    gen_spritesheet(
      10, '../../resources/champion/', champion_image_list, 'champion_spritesheet.png', 
      champion_css, champion_css_prefix, '../data/champion_spritesheet.png', 
      (120, 120), size_percentage=percentage, responsive_768=responsive_768, write_spritesheet_map=True)

  if not exclude_item:
    gen_spritesheet(
      10, '../../resources/item/', item_image_list, 'item_spritesheet.png', 
      item_css, item_css_prefix, '../data/item_spritesheet.png', 
      (64, 64), size_percentage=percentage, responsive_768=responsive_768)

  if not exclude_summoner:
    gen_spritesheet(
      10, '../../resources/spell/', summoner_image_list, 'summoner_spritesheet.png', 
      summoner_css, summoner_css_prefix, '../data/summoner_spritesheet.png', 
      (64, 64), size_percentage=percentage, responsive_768=responsive_768)
  
  if not exclude_match_icon:
    gen_spritesheet(
      10, '../../assets/matchListIcons/', match_icon_list, 'match_icon_spritesheet.png',
      match_icon_css, match_icon_css_prefix, '../data/match_icon_spritesheet.png',
      (20, 20), size_percentage=percentage, responsive_768=responsive_768)

  if not exclude_rune:
    gen_spritesheet(
      10, '../../resources/', rune_image_list, 'rune_spritesheet.png',
      rune_css, rune_css_prefix, '../data/rune_spritesheet.png',
      (64, 64), size_percentage=percentage, responsive_768=responsive_768)
  
  if not exclude_perk:
    gen_spritesheet(
      10, '../../resources/', perk_image_list, 'perk_spritesheet.png',
      perk_css, perk_css_prefix, '../data/perk_spritesheet.png',
      (32, 32), size_percentage=percentage, responsive_768=responsive_768)

  if not exclude_rank:
    gen_spritesheet(
      10, '../../resources/rank/', rank_image_list, 'rank_spritesheet.png',
      rank_css, rank_css_prefix, '../data/rank_spritesheet.png',
      (512, 585), size_percentage=percentage, responsive_768=responsive_768)


if __name__ == '__main__':
  main()