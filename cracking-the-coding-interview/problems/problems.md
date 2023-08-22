# Problem List #

Make a fork of this repository, and solve the problems in the language of your choice. 

## Strings ##

1. *Is Unique*: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

2. *Check Permutation*: Given two strings, write a method to decide if one is a permutation of the other.

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
