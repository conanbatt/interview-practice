# Problem List #

Make a fork of this repository, and solve the problems in the language of your choice. 

If you are stuck, please refer to the source material in the book that has explanations, hints and full solutions to each of these problems.

## Strings ##

1. *Is Unique*: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

2. *Check Permutation*: Given two strings, write a method to decide if one is a permutation of the other. 
[LeetCode](https://leetcode.com/problems/permutation-in-string/)

3.  URLify: Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string.

```
EXAMPLE
Input: "Mr 3ohn Smith "
Output: "Mr%203ohn%20Smith"
```

4. *Palindrome Permutation*: Given a string, write a function to check if it is a permutation of a palin- drome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

```
EXAMPLE
Input: Tact Coa
Output True (permutations: "taco cat", "atco eta", etc.)
```

5. *One Away*: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.

6. *String Compression*: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2blc5a3, If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a - z).

7. *Rotate Matrix*: Given an image represented by an NxN matrix, where each pixel in the image is 4
bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

8. *Zero Matrix*: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

9. *String Rotation*; Assume you have a method i s S u b s t r i n g which checks if one word is a substring of another. Given two strings, si and s2, write code to check if s2 is a rotation of si using only one call to isSubst ring [e.g., "waterbottle" is a rotation oP'erbottlewat")

## Linked Lists ##

1. *Remove Dups*: Write code to remove duplicates from an unsorted linked list. FOLLOW UP
How would you solve this problem if a temporary buffer is not allowed?

2.  *Return Kth to Last*: Implement an algorithm to find the kth to last element of a singly linked list.

3. *Delete Middle Node*: Implement an algorithm to delete a node in the middle (i.e., any node but the first and last node, not necessarily the exact middle) of a singly linked list, given only access to that node.

```
EXAMPLE
Input: the node c from the linked list a - >b- >c - >d - >e- >f
Result: nothing is returned, but the new linked list looks like a->b->d->e->f Hints: #72
```

4. *Partition*: Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x. Ifxis contained within the list, the values of x only need to be after the elements less than x (see below). The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions.

```
EXAMPLE
Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1[partition=5]
Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
```

5. *Sum Lists*: You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the Vs digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.

```
EXAMPLE
Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
Output: 2 -> 1 -> 9. That is, 912.
```

6.  Suppose the digits are stored in forward order. Repeat the above problem.

```
EXAMPLE
Input: (6 -> 1 -> 7) + (2 -> 9 -> 5).Thatis,617 + 295
Output:9 -> 1 -> 2,Thatis,912.
```

7. *Palindrome*: Implement a function to check if a linked list is a palindrome.

8.  *Intersection*; Given two (singly) linked lists, determine if the two lists intersect. Return the inter- secting node. Note that the intersection is defined based on reference, not value. That is, if the kth node of the first linked list is the exact same node (by reference) as the j t h node of the second linked list, then they are intersecting.

9. *Loop Detection*: Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop.

```
DEFINITION
Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list.
```

```
EXAMPLE
Input: A->8->C->D->E-> C[thesameCasearlier] Output: C
Hints: #50, #69, #83, #90
```

## Stacks and Queues ##

1. *Three in One*: Describe how you could use a single array to implement three stacks.

2. *Stack Min*: How would you design a stack which, in addition to push and pop, has a function min which returns the minimum element? Push, pop, and min should all operate in O(1) time.

3. *Stack of Plates*: Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks.push() and SetOfStacks.pop() should behave identically to a single stack (that is, pop() should return the same values as it would if there were just a single stack).

FOLLOW UP: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.

4. *Queue via Stacks*: Implement a MyQueue class which implements a queue using two stacks.

5. *Sort Stack*: Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary stack, but you may not copy the elements into any other data structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.

6. *Animal Shelter*: An animal shelter, which holds only dogs and cats, operates on a strictly "first in, first out" basis. People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type). They cannot select which specific animal they would like. Create the data structures to maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog, and dequeueCat. You may use the built-in LinkedList data structure.


## Trees and Graphs ##

1. *Route Between Nodes*: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.

2. *Minimal Tree*: Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height.

3. *List of Depths*: Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).

4. *Check Balanced*: Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.

5. *Validate BST*: Implement a function to check if a binary tree is a binary search tree.

6. *Successor*: Write an algorithm to find the "next" node (i.e., in-order successor) of a given node in a binary search tree. You may assume that each node has a link to its parent.

7. *Build Order*: You are given a list of projects and a list of dependencies (which is a list of pairs of projects, where the second project is dependent on the first project). All of a project's dependencies must be built before the project is. Find a build order that will allow the projects to be built. If there is no valid build order, return an error.

```
EXAMPLE Input:
projects: a, b, c, d, e, f
dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
Output: F, e, a, b, d, c
```

8. *First Common Ancestor*: Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not necessarily a binary search tree.

8. *BST Sequences*: A binary search tree was created by traversing through an array from left to right and inserting each element. Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.

```
EXAMPLE Input:
Output: {2, 1, 3}, {2, 3, 1}
```


## Recursive and Dynamic Programming ##

1. *Triple Step*: A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time. Implement a method to count how many possible ways the child can run up the stairs.

2. *Robot in a Grid*: Imagine a robot sitting on the upper left corner of a grid with r rows and c columns. The robot can only move in two directions, right and down, but certain cells are "off limits" such that the robot cannot step on them. Design an algorithm to find a path for the robot from the top left to the bottom right.
[LeetCode](https://leetcode.com/problems/unique-paths-ii/)

3. *Magic Index*: A magic index in an array A[0...n-1] is defined to be an index such that A[i] = i. Given a sorted array of distinct integers, write a method to find a magic index, if one exists, in array A.
FOLLOW UP: What if the values are not distinct?

4. *Power Set*: Write a method to return all subsets of a set.

5. *Recursive Multiply*: Write a recursive function to multiply two positive integers without using the * operator. You can use addition, subtraction, and bit shifting, but you should minimize the number of those operations.

6. *Towers of Hanoi*: In the classic problem of the Towers of Hanoi, you have 3 towers and N disks of different sizes which can slide onto any tower. The puzzle starts with disks sorted in ascending order of size from top to bottom (i.e., each disk sits on top of an even larger one). You have the following constraints:

Only one disk can be moved at a time.
A disk is slid off the top of one tower onto another tower.
A disk cannot be placed on top of a smaller disk.
Write a program to move the disks from the first tower to the last using stacks.
Permutations without Dups: Write a method to compute all permutations of a string of unique characters.

7. *Permutations with Dups*: Write a method to compute all permutations of a string whose characters are not necessarily unique. The list of permutations should not have duplicates.
