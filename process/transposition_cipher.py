def tp_encrypt(text, key):
    temp_row = ""
    dictionary = {}
    for i in range(len(key)):
        for item in ["".join(text[i:i+len(key)]) for i in range(0, len(text), len(key))]:
            if i < len(item):
                temp_row += item[i]
            else:
                continue
        dictionary[key[i]] = temp_row
        temp_row = ""
    result = ""
    for letter_idx in sorted(key):
        result += dictionary[letter_idx]
    return result

def tp_decrypt(text, key):
    dictionary = {}
    row_result = []
    step = 0
    result = ""
    for letter in sorted(key):
        x = list(key).index(letter)
        if x in [i for i in range(len(text)%len(key))]:
            add = text[step:step+(len(text)//len(key)+1)]
            dictionary[letter] = add
            step += len(text)//len(key)+1
        else:
            add = text[step:step+(len(text)//len(key))]
            dictionary[letter] = add
            step += len(text)//len(key)
    
    for letter_idx in key:
        row_result.append(dictionary[letter_idx])
    
    for i in range(int(len(text)//len(key)+1)):
        for item in row_result:
            if i < len(item):
                result += item[i]
            else:
                continue
    return result

