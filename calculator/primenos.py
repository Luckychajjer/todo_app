
def prime100():
    n=0
    i=2
    anslist=[]
    while n <100:
        y= prime(i)
        if y is True:
            anslist.append(i)
            i+=1
            n+=1
        else:
            i+=1
    print(anslist)

def prime(nos):
    if nos in [0,1]:
        print("0,1 are not prime")
        exit()
    for i in range(2,int(nos/2)+1):
        if (nos%i) == 0:
            return False
            break
    else:
        return True
print("option 1--enter number to check wheather it is prime or not")
print("option 2--print first 100 prime number")
ans = int(input())
if ans == 1:
    nos = int(input("enter number"))
    x= prime(nos)
    print("prime") if x is True else print("not prime")
else:
    prime100()
