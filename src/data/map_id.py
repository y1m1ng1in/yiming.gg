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

def write_json(fname, json_obj):
  with open(fname, 'w') as f:
    json.dump(json_obj, f)
  f.close()

def main():
  champion = process_champion()
  item     = process_item()
  summoner = process_summoner()

  write_json("championLookup.json", champion)
  write_json("itemLookup.json", item)
  write_json("summonerLookup.json", summoner)


if __name__ == '__main__':
  main()