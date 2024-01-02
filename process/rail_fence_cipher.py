def rf_encrypt(plaintext, key):
    """
    Encryption function for a general transposition cipher.

    Parameters
    ----------
    plaintext: str
        Text to be encrypted.
    key: function
        A function that takes the length of the plaintext as an argument and
        returns a sequence of indices that transpose the plaintext into the
        ciphertext.

    Returns
    -------
    str: The ciphertext.
    """
    text_list = list(plaintext)
    generator = rf_key(len(key))
    indices_list = [next(generator) for i in range(len(plaintext))]
    dict = {}
    for i, j in zip(indices_list, text_list):
        if i not in dict:
            dict[i] = j
        else:
            dict[i] += j
    return "".join(dict[i] for i in dict)


def rf_decrypt(ciphertext, key):
    """
    Decryption function for a general transposition cipher.

    Parameters
    ----------
    ciphertext: str
        Text to be descrypted.
    key: function
        A function that takes the length of the plaintext as an argument and
        returns a sequence of indices that transpose the plaintext into the
        ciphertext.

    Returns
    -------
    str: The plaintext.
    """
    generator = rf_key(len(key))
    text_list = list(ciphertext)
    indices_list = [next(generator) for i in range(len(ciphertext))]
    dict = {}
    for i in indices_list:
        if i not in dict:
            dict[i] = 1
        else:
            dict[i] += 1
    
    split_list = []
    n = 0
    length = 0
    
    #split string
    for i in dict:
        length += dict[i]
        split_list.append(ciphertext[n:length])
        n = length
    
    count = -1
    result_list = ""
    state = True
    state_up = True
    
    while state:
        if count <= 0:
            state_up = True
        if count == 2: 
            state_up = False
            
        if state_up:
            count += 1
        else:
            count -=1  
            
        result_list += split_list[count][0] 
        split_list[count] = split_list[count][1:len(split_list[count])]
        
        if len("".join(split_list)) <= 0:
            state = False    

    return result_list
        

def rf_key(k):
    """
    Generation of the sequence of indices for Rail Fence transposition cipher.

    Parameters
    ----------
    k: positive int
        Number of rails.

    Returns
    -------
    Function: The key function that takes the length of the plaintext as an
        argument and returns a sequence of indices that transpose the plaintext
        into the ciphertext.
    """
    # YOUR CODE HERE
    def init():
        return 0
    i = init()
    n = 0
    state = True
    while True:
        val = (yield n)
        
        if val == "restart":
            n = 0
        
        if n == 0:
            state = True
        if n == 2: 
            state = False
            
        if state:
            n += 1
        else:
            n -=1 
            
        if val == "restart":
            i = init()