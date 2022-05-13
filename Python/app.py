import requests
from bs4 import BeautifulSoup

def 현재가(구멍):
  데이터 = requests.get(f'https://finance.naver.com/item/sise.nhn?code={구멍}')
  soup = BeautifulSoup(데이터.content, 'html.parser')
  return soup.find_all('strong', id="_nowVal")[0].text

print(현재가('005930'))