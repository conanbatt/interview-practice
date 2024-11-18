"""
Problem Statement
As inspired by the pen-and-paper puzzle called Galaxies, in this problem a galaxy is a set of points in the plane that looks the same when turned upside down. More precisely, the set of points G is a galaxy with center C(G) if rotating the set G around the point C(G) by 180 degrees gives exactly the set G again.
Note that for any galaxy G its center C(G) is always unique. Also note that C(G) may but does not have to belong to G.
You are given a collection of N distinct points in the plane: for each valid i there is a point at (X[i], Y[i]).
Count all unordered pairs of distinct points C1, C2 in that plane such that we can divide all the given points into two disjoint non-empty galaxies G1 and G2 such that C(G1) = C1 and C(G2) = C2. Return that count modulo 1,000,000,007.
Definition
    	
Class:	TwoGalaxies
Method:	count
Parameters:	int[], int[]
Returns:	int
Method signature:	int count(int[] X, int[] Y)
(be sure your method is public)
Constraints
-	X will contain between 2 and 100 elements, inclusive.
-	Y will contain the same number of elements as X.
-	All numbers in X and Y will be between 0 and 500,000,000, inclusive.
-	All points described by X and Y will be distinct.
Examples
0)	
    	
[0, 0, 2, 2, 2, 2]
[1, 3, 0, 1, 3, 4]
Returns: 2
1)	
    	
[0, 1, 10, 10]
[0, 1, 0, 1]
Returns: 3
There are three ways of dividing these points into pairs. Each of them is a valid way of forming two disjoint galaxies, and each way gives us a different pair of galaxy centers.
Note that a galaxy center may have non-integer coordinates.
2)	
    	
[47, 10, 11, 12, 13, 15, 14]
[47, 42, 42, 42, 42, 42, 42]
Returns: 3
Sometimes one of the galaxies can consist of just a single point. In one of the three valid solutions for this test case the point (47, 47) is a galaxy of its own, with a center at (47, 47).
3)	
    	
[0, 1, 2, 3, 4, 5, 6, 7]
[0, 1, 4, 9, 16, 25, 36, 49]
Returns: 0
Sometimes there is no way to form two disjoint galaxies out of all the given points.
4)	
    	
[0, 0, 10, 10]
[0, 10, 0, 10]
Returns: 2
Remember that both galaxies must be non-empty and the two galaxy centers must be distinct.
"""

class Solution:
    def count(self, X, Y):
        return 0
