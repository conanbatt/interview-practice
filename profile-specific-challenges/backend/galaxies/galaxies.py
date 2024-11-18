
def symetric(c,a):
    return (2*c[0]-a[0], 2*c[1]-a[1])

def center_candidates(pts):
    candidates = []
    for i in range(len(pts)):
        for j in range(i+1,len(pts)):    
            center = ( (pts[i][0]+pts[j][0])/2, (pts[i][1]+pts[j][1])/2 )
            candidates.append(center)
    return list(set(candidates+pts))

def check_center(pts, c):
    for p in pts:
        if symetric(c,p) not in pts:
            return False
    return True

class Solution:
    def count(self, X, Y):
        n = len(X)
        last_bm = 1<<n
        pts = [(X[i], Y[i]) for i in range(n)]
        candidates = center_candidates(pts)
        ans = 0
        #print(candidates)
        for i in range(len(candidates)):
            for j in range(i+1, len(candidates)):
                c1 = candidates[i]
                c2 = candidates[j]
                for xbm in range(1,last_bm-1):
                    ybm = (last_bm - 1) ^ xbm
                    xs = [ (X[i], Y[i]) for i in range(n) if (xbm & (1<<i)) ]
                    ys = [ (X[i], Y[i]) for i in range(n) if (ybm & (1<<i)) ]
                    if check_center(xs,c1) and check_center(ys,c2):
                        ans += 1
                        break
        return ans
      

if __name__ == "__main__":
    solution = Solution()
    
    print(solution.count([0]*10, list(range(10))))
    print(solution.count([0]*5+[1]*5, list(range(5))+list(range(5))))
    
    
