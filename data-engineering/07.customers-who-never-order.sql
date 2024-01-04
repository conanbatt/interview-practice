# Write your MySQL query statement below
SELECT name as Customers
FROM Customers
LEFT JOIN Orders
ON Customers.id = Orders.customerId
WHERE customerId IS NULL;