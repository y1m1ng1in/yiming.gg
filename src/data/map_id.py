import json


def process_champion():
  mapping = {}
  with open('../../assets/dataDragon/champion.json', encoding="utf8") as f:
    data = json.load(f)
    for champion in data['data']:
      mapping[int(data['data'][champion]['key'])] = {
        'originalKey': champion,
        'id'         : data['data'][champion]['id'],
        'name'       : data['data'][champion]['name'],
        'image'      : data['data'][champion]['image']
      }
  f.close()
  return mapping


def process_item():
  mapping = {}
  with open('../../assets/dataDragon/item.json', encoding="utf8") as f:
    data = json.load(f)
    for id in data['data']:
      mapping[int(id)] = {
        'name':        data['data'][id]['name'],
        'description': data['data'][id]['description'],
        'image':       data['data'][id]['image']
      }
  f.close()
  return mapping


def process_summoner():
  mapping = {}
  with open('../../assets/dataDragon/summoner.json', encoding="utf8") as f:
    data = json.load(f)
    for summoner in data['data']:
      mapping[int(data['data'][summoner]['key'])] = {
        'id':          data['data'][summoner]['id'],
        'name':        data['data'][summoner]['name'],
        'description': data['data'][summoner]['description'],
        'image':       data['data'][summoner]['image']
      }
  f.close()
  return mapping


def process_perk():
  mapping = {}
  with open('../../assets/dataDragon/runesReforged.json', encoding="utf8") as f:
    data = json.load(f)
    for perk in data:
      mapping[int(perk['id'])] = {
        'key'  : perk['key'],
        'name' : perk['name'],
        'image': perk['icon'],
        'rune' : False
      }
      for slot in perk['slots']:
        for rune in slot['runes']:
          mapping[int(rune['id'])] = {
            'key'      : rune['key'],
            'name'     : rune['name'],
            'image'    : rune['icon'],
            'shortDesc': rune['shortDesc'],
            'longDesc' : rune['longDesc'],
            'rune'     : True
          }
  f.close()
  return mapping


def write_json(fname, json_obj):
  with open(fname, 'w') as f:
    json.dump(json_obj, f)
  f.close()


def main():
  champion = process_champion()
  item     = process_item()
  summoner = process_summoner()
  perk     = process_perk()

  write_json("championLookup.json", champion)
  write_json("itemLookup.json", item)
  write_json("summonerLookup.json", summoner)
  write_json("perkLookup.json", perk)


if __name__ == '__main__':
  main()