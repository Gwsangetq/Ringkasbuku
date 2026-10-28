with open(r'C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\dom_output.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('Length of dom_output:', len(text))
print('book-card in dom_output?', 'book-card' in text)
print('atomic-habits in dom_output?', 'atomic-habits' in text)

idx = text.find('id="bookList"')
if idx != -1:
    print('Found id="bookList":')
    print(text[idx:idx+500])
else:
    print('id="bookList" NOT found in dom_output!')
