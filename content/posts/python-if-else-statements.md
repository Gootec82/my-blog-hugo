---
title: "Making Decisions in Python: If/Else Statements Made Simple"
slug: "python-if-else-statements"
date: 2025-10-16
description: "Learn Python if/else statements through real-world examples and simple illustrations. Master conditional logic to make your Python programs smart and interactive."
tags: ["python if else", "conditional statements", "python programming", "beginner python", "coding logic"]
categories: ["Python"]
draft: false
image: "/images/python-if-else.webp"
imageBig: "/images/python-if-else.webp"
imageAlt: "Python code showing if/else statements with traffic light analogy"
author: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

Hey there! Welcome back to our Python journey. 🐍

[Remember when we learned about variables and data types?](https://devviews.com/posts/python-variables-data-types/) Well, today we're going to make our programs **smart** by teaching them how to make decisions!

Think about your daily life:
- **If** it's raining, you take an umbrella ☔
- **Else if** it's sunny, you wear sunglasses 😎  
- **Else** you check the weather app! 📱

Python's `if/else` statements work exactly the same way. Let me show you how simple and powerful they are!

## The Basic If/Else Structure

Let's start with a simple real-world example:

```python
# Simple analogy: Deciding what to wear
weather = "rainy"

if weather == "rainy":
    print("Take an umbrella! ☔")
else:
    print("Enjoy the sunshine! ☀️")
```

What's happening here?

We check if the weather is "rainy"

If true, Python runs the indented code below

If false, it runs the code under else

🚦 Traffic Light Analogy
Think of if/else statements like traffic lights:

```python
light_color = "red"

if light_color == "red":
    print("🛑 STOP!")
elif light_color == "yellow":
    print("⚠️ SLOW DOWN!")
else:  # green light
    print("✅ GO!")
```

Comparison Operators: The Decision Tools
Before we dive deeper, let's understand the tools Python uses to make comparisons:

# Equal to

```python
age = 25
if age == 25:  # True
    print("You're 25 years old!")
```
# Not equal to

```  python
if age != 30:  # True
    print("You're not 30 years old")
```

# Greater than

```python
if age > 18:   # True
    print("You're an adult")
```

# Less than

```python
if age < 65:   # True  
    print("You're not a senior yet")
```

# Greater than or equal to

```python
if age >= 21:  # True
    print("You can drink in the US")
```

# Less than or equal to

```python
if age <= 25:  # True
    print("You're 25 or younger")
```

Multiple Conditions with Elif
What if we have more than two options? Enter elif (short for "else if"):


# Grading system example

```python
score = 85

if score >= 90:
    grade = "A"
    message = "Excellent! 🎉"
elif score >= 80:
    grade = "B"
    message = "Great job! 👍"
elif score >= 70:
    grade = "C" 
    message = "Good work! 👏"
elif score >= 60:
    grade = "D"
    message = "You passed! ✅"
else:
    grade = "F"
    message = "Let's practice more! 📚"

print(f"Grade: {grade} - {message}")
```

Important: Python checks conditions from top to bottom and stops at the first true condition!

Logical Operators: Combining Conditions
Sometimes you need to check multiple things at once:



# AND operator - both conditions must be True

```python
age = 16
has_money = True

if age >= 13 and has_money:
    print("You can buy a movie ticket! 🎬")
```

# OR operator - at least one condition must be True 

```python
day = "saturday"
is_holiday = True

if day == "saturday" or day == "sunday" or is_holiday:
    print("It's the weekend! Time to relax! 🏖️")
```

# NOT operator - reverses the condition

```python
is_raining = False

if not is_raining:
    print("Perfect day for a walk! 🚶")
```



Real-World Example: Movie Ticket System
Let's build a complete movie ticket system:

```python
print("=== Welcome to Python Cinema ===")

age = int(input("How old are you? "))
has_money = input("Do you have money? (yes/no) ").lower() == "yes"
is_weekend = input("Is it weekend? (yes/no) ").lower() == "yes"
```

# Decision making time!

```python
if age < 5:
    print("🎬 Free ticket for little ones!")
elif age < 13:
    print("🎬 Child ticket: $8")
elif age >= 65:
    print("🎬 Senior discount: $10")
else:
    print("🎬 Adult ticket: $12")
```

# Additional conditions

```python
if has_money:
    print("💰 You can purchase snacks!")
else:
    print("💸 Maybe just enjoy the movie!")

if is_weekend:
    print("🎉 Weekend surcharge applies (+$2)")
```


Your Turn: Practice Exercise
Try this simple game - a number guessing challenge:


import random

# Computer picks a secret number

```python
secret_number = random.randint(1, 10)

print("🎯 I'm thinking of a number between 1 and 10!")

# Get user's guess
guess = int(input("What's your guess? "))
```

# Check the guess

```python
if guess == secret_number:
    print("🎉 Amazing! You guessed it!")
elif guess > secret_number:
    print("📉 Too high! Try a lower number.")
    print(f"The secret number was {secret_number}")
else:
    print("📈 Too low! Try a higher number.") 
    print(f"The secret number was {secret_number}")
```


Challenge: Modify this game to give the user 3 tries to guess the number!

Common Mistakes to Avoid
1. Forgetting the Colon


# ❌ Wrong

```python
if age == 25
    print("You're 25!")
```

# ✅ Correct  

```python
if age == 25:
    print("You're 25!")


2. Using = Instead of ==
```

# ❌ Wrong (this assigns instead of comparing)

```python
if age = 25:
    print("You're 25!")
```

# ✅ Correct

```python
if age == 25:
    print("You're 25!")
```

3. Incorrect Indentation

# ❌ Wrong

```python
if age > 18:
print("You're an adult")  # Missing indentation
```

# ✅ Correct

```python
if age > 18:
    print("You're an adult")  # Proper indentation
```


4. Too Many Nested Conditions

# ❌ Hard to read

```python
if condition1:
    if condition2:
        if condition3:
            print("This is confusing!")
```

# ✅ Better

```python
if condition1 and condition2 and condition3:
    print("Much clearer!")
```


Advanced Example: Smart Weather Advisor
Let's build something really useful:

```python
print("🌤️  Smart Weather Advisor")

temperature = int(input("What's the temperature? (°F) "))
is_raining = input("Is it raining? (yes/no) ").lower() == "yes"
is_weekend = input("Is it weekend? (yes/no) ").lower() == "yes"

print("\n💡 My recommendations:")
```

# Temperature-based recommendations

```python
if temperature > 85:
    print("• Stay hydrated! 💧")
    print("• Wear light clothing 👕")
elif temperature > 60:
    print("• Perfect weather! 😊")
    print("• Great for outdoor activities 🚴")
else:
    print("• Bundle up! 🧥")
    print("• Hot drink weather ☕")
```

# Rain considerations

```python
if is_raining:
    print("• Don't forget your umbrella! ☔")
    print("• Perfect movie day 🎬")
else:
    print("• No umbrella needed! 🌞")
    print("• Great for a walk 🚶")
```

# Weekend specials

```python
if is_weekend and not is_raining and temperature > 60:
    print("• Perfect for a picnic! 🧺")
    print("• Maybe visit the park 🌳")


Debugging Tips
Problem: My if/else statement isn't working!
Solution:

Check your colons :

Verify indentation (4 spaces)

Use print() to see variable values
```
Test each condition separately



# Debugging example

```python
age = 25
print(f"Debug: age = {age}")  # See the actual value

if age == 25:
    print("Condition is true!")
else:
    print("Condition is false!")
```



What's Next? Python Loops!
In our next post, we'll learn about loops - how to make Python repeat tasks for you! We'll cover:

for loops for repeating tasks a specific number of times

while loops for repeating until a condition changes

Building a number guessing game with unlimited tries

Automating repetitive tasks

Your Mission
Create a "Restaurant Order System" that:

Asks for the customer's age

Asks what they want to order

Suggests drinks based on age (alcohol for 21+, soda for others)

Applies discounts for seniors (65+)

Shows a custom message based on their order

Bonus: Add a loyalty program check and apply points!

Wrapping Up
Today you learned how to make your Python programs smart! You can now:

✅ Use if, elif, and else statements

✅ Compare values using operators

✅ Combine conditions with and, or, not

✅ Build interactive programs that make decisions

✅ Avoid common beginner mistakes

Remember: Programming is about solving real problems. Every time you write an if/else statement, you're teaching your program to think!

Practice makes perfect - try modifying the examples, break them, fix them, and create your own decision-making programs!

Happy coding! 🐍

Stuck on any of the examples? Have a cool if/else project you built? Share in the comments below! I'd love to see what you create.