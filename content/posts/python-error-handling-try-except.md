---
title: "Python Error Handling: Try/Except Made Simple (Stop Your Code From Crashing!)"
slug: "python-error-handling-try-except"
date: 2026-01-27
description: "Learn Python error handling with try/except blocks. Write robust code that doesn't crash, with practical examples and real-world debugging techniques."
tags: ["python error handling", "try except", "python exceptions", "debugging", "python programming"]
categories: ["Python"]
draft: false
image: "/images/python-error-handling.webp"
imageBig: "/images/python-error-handling.webp"
imageAlt: "Python code showing try/except blocks with error prevention visualization"
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

Hey there! 👋 Remember when we were learning data structures and your code kept crashing with scary red error messages? I've been there too! In fact, I have a confession...

My first real Python project crashed **47 times** before it finally worked. Every time, I'd get a new error message, panic, and not know what to do. It was frustrating and made me want to give up!

But then I learned about error handling, and everything changed. Today, I'll show you how to write Python code that **doesn't crash** - even when things go wrong!

## The Day My App Didn't Crash

Let me tell you about my "aha" moment with error handling. I built a simple calculator app for my grandma. She typed "ten" instead of "10" and... it didn't crash! Instead, it said:
```

"Oops! Please enter a number like 10 or 5.5"



That moment changed how I write code forever. Today, I'll show you how to create those "aha" moments in your own projects!

## Why Error Handling Matters More Than You Think

### Before Error Handling:
```python
# ❌ Code that crashes
age = int(input("How old are you? "))
print(f"You'll be 100 in {100 - age} years!")

# User types "twenty-five" → CRASH! 💥
# ValueError: invalid literal for int()
```

After Error Handling:
```python
# ✅ Code that helps users fix mistakes
try:
    age = int(input("How old are you? "))
    print(f"You'll be 100 in {100 - age} years!")
except ValueError:
    print("Please enter a number like 25, not 'twenty-five'!")
```

See the difference? One frustrates users, the other helps them!

The Basic Try/Except Pattern
Think of try/except like a safety net for your code:

```python
try:
    # Code that might fail goes here
    risky_operation()
except:
    # What to do if it fails
    handle_error()
```

Real-World Example: User Input Validation

```python
def get_user_age():
    """Safely get user's age with error handling"""
    while True:
        try:
            age = int(input("How old are you? "))
            if age < 0 or age > 120:
                print("Please enter a realistic age!")
                continue
            return age
        except ValueError:
            print("Please enter a number like 25, not 'twenty-five'!")
        except KeyboardInterrupt:
            print("\nGoodbye! 👋")
            exit()

# Now this works perfectly!
age = get_user_age()
print(f"Great! You're {age} years old.")
```

Common Python Errors and How to Handle Them
1. ValueError - Wrong Type of Value

```python
try:
    number = int("not a number")  # This will fail
    print(f"Number: {number}")
except ValueError as e:
    print(f"Value error: {e}")
    print("Please enter a valid number!")
```

2. TypeError - Wrong Type of Operation

```python
try:
    result = "hello" + 5  # Can't add string and int
except TypeError as e:
    print(f"Type error: {e}")
    # Fix it
    result = "hello" + str(5)
    print(f"Fixed: {result}")
```

3. IndexError - List Index Out of Range

```python
fruits = ["apple", "banana", "cherry"]

try:
    print(fruits[5])  # Only 3 items, index 5 doesn't exist!
except IndexError:
    print(f"List has only {len(fruits)} items. Use index 0-{len(fruits)-1}")
```

4. KeyError - Dictionary Key Doesn't Exist

```python
user = {"name": "Alice", "age": 25}

try:
    print(user["email"])  # Key doesn't exist!
except KeyError:
    print("Email not found. Available keys:", list(user.keys()))
```

5. FileNotFoundError - Missing Files

```python
try:
    with open("missing_file.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found! Check the filename and path.")
    # Create the file instead
    with open("missing_file.txt", "w") as file:
        file.write("Created this file for you!")
```
		
The "Else" and "Finally" Clauses
The Complete Try/Except/Else/Finally Structure

```python
def process_file(filename):
    """Complete error handling example"""
    try:
        print(f"📂 Trying to open {filename}...")
        file = open(filename, "r")
        content = file.read()
        
    except FileNotFoundError:
        print(f"❌ File {filename} not found!")
        return None
        
    except PermissionError:
        print(f"❌ No permission to read {filename}")
        return None
        
    except Exception as e:
        print(f"❌ Unexpected error: {type(e).__name__}: {e}")
        return None
        
    else:
        # Runs ONLY if try block succeeds (no exceptions)
        print(f"✅ Successfully read {filename}")
        return content
        
    finally:
        # Runs ALWAYS, whether successful or not
        print(f"🔒 Cleaning up resources for {filename}")
        if 'file' in locals():
            file.close()

# Test it
result = process_file("example.txt")
```

Practical Project: Robust Calculator
Let's build a calculator that never crashes!

```python
class RobustCalculator:
    def __init__(self):
        self.operations = {
            '+': self.add,
            '-': self.subtract,
            '*': self.multiply,
            '/': self.divide
        }
    
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b
    
    def divide(self, a, b):
        if b == 0:
            raise ZeroDivisionError("Cannot divide by zero!")
        return a / b
    
    def calculate(self):
        print("🧮 Welcome to the Robust Calculator!")
        print("Enter 'quit' to exit")
        
        while True:
            try:
                # Get first number
                num1_input = input("\nEnter first number (or 'quit'): ")
                if num1_input.lower() == 'quit':
                    print("👋 Goodbye!")
                    break
                
                num1 = float(num1_input)
                
                # Get operation
                op = input("Enter operation (+, -, *, /): ")
                if op not in self.operations:
                    print(f"❌ Invalid operation. Choose from {list(self.operations.keys())}")
                    continue
                
                # Get second number
                num2 = float(input("Enter second number: "))
                
                # Perform calculation
                result = self.operations[op](num1, num2)
                
                print(f"✅ Result: {num1} {op} {num2} = {result}")
                
            except ValueError:
                print("❌ Please enter valid numbers!")
                
            except ZeroDivisionError as e:
                print(f"❌ {e}")
                
            except Exception as e:
                print(f"❌ Unexpected error: {e}")
                print("Please try again!")
                
            else:
                # Success! Offer to save result
                save = input("Save this calculation? (y/n): ")
                if save.lower() == 'y':
                    with open("calculations.txt", "a") as f:
                        f.write(f"{num1} {op} {num2} = {result}\n")
                    print("💾 Saved to calculations.txt")
                
            finally:
                print("-" * 30)

# Try it out!
# calculator = RobustCalculator()
# calculator.calculate()
```

Real-World Example: API Request Handler
Here's how I handle errors in real applications:

```python
import requests
import time

def fetch_weather(city, retries=3):
    """Fetch weather with robust error handling"""
    url = f"https://api.weather.example.com/{city}"
    
    for attempt in range(retries):
        try:
            print(f"Attempt {attempt + 1}/{retries} for {city}...")
            
            response = requests.get(url, timeout=5)
            response.raise_for_status()  # Raises HTTPError for bad status
            
            data = response.json()
            
            # Validate response structure
            if 'temperature' not in data:
                raise KeyError("Temperature data missing from response")
            
            return data
            
        except requests.exceptions.Timeout:
            print(f"⏰ Timeout fetching {city}. Retrying...")
            time.sleep(2)  # Wait before retry
            
        except requests.exceptions.ConnectionError:
            print(f"🔌 Connection error. Check your internet.")
            if attempt == retries - 1:  # Last attempt
                return {"error": "Could not connect to weather service"}
            
        except requests.exceptions.HTTPError as e:
            print(f"🌐 HTTP Error: {e.response.status_code}")
            if e.response.status_code == 404:
                return {"error": f"City '{city}' not found"}
            else:
                return {"error": f"Server error: {e.response.status_code}"}
                
        except KeyError as e:
            print(f"🔑 Missing expected data: {e}")
            return {"error": "Weather data format changed"}
            
        except Exception as e:
            print(f"❌ Unexpected error: {type(e).__name__}: {e}")
            if attempt == retries - 1:  # Last attempt
                return {"error": "Unknown error occurred"}
    
    return {"error": "Max retries reached"}

# Usage
# weather = fetch_weather("London")
# print(weather)
```

Custom Exceptions: Speaking Your Code's Language
Create exceptions that make sense for your application:

```python
class BankingError(Exception):
    """Base class for banking errors"""
    pass

class InsufficientFundsError(BankingError):
    """Raised when account has insufficient funds"""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        message = f"Cannot withdraw ${amount:.2f}. Balance: ${balance:.2f}"
        super().__init__(message)

class Account:
    def __init__(self, initial_balance=0):
        self.balance = initial_balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        
        self.balance -= amount
        print(f"✅ Withdrew ${amount:.2f}. New balance: ${self.balance:.2f}")
        return amount

# Using custom exceptions
try:
    account = Account(100)
    account.withdraw(50)   # ✅ Success
    account.withdraw(100)  # ❌ Raises InsufficientFundsError
    
except InsufficientFundsError as e:
    print(f"💸 Banking error: {e}")
    # Could offer overdraft protection here
    
except BankingError as e:
    print(f"🏦 General banking error: {e}")
```

Debugging Tips: From Panic to Solution
When you see an error, don't panic! Follow this process:

Step 1: Read the Error Message

```python
# Bad: "OMG it crashed!"
# Good: "It's a ValueError saying 'invalid literal for int()'"
```
Step 2: Find the Line Number

```python
# Error says "line 42" → Look at line 42 in your code
```

Step 3: Reproduce the Error

```python
# Can you make it happen again with the same input?
```

Step 4: Add Debugging

```python
try:
    result = risky_operation()
except Exception as e:
    print(f"Error type: {type(e).__name__}")
    print(f"Error message: {e}")
    print(f"Line number: {e.__traceback__.tb_lineno}")
    # Now you have all the info to fix it!
```

Best Practices for Production Code
1. Be Specific with Exceptions

```python
# ❌ Too broad
try:
    do_something()
except:
    pass  # Catches EVERYTHING, even KeyboardInterrupt!

# ✅ Specific
try:
    do_something()
except (ValueError, TypeError) as e:
    handle_known_error(e)
except Exception as e:
    log_error(e)  # Log unexpected errors
    raise  # Re-raise for higher level handling
```

2. Don't Swallow Errors Silently

```python
# ❌ Bad - error disappears
try:
    save_data()
except:
    pass  # User never knows it failed!

# ✅ Good - inform the user
try:
    save_data()
except Exception as e:
    print(f"Could not save: {e}")
    log_error(e)
```

3. Use Context Managers for Resources

```python
# ✅ Automatic cleanup
with open("file.txt", "r") as file:
    content = file.read()
# File automatically closes, even if error occurs
```

What's Next? File Handling in Python!
In our next Python post, we'll dive into "Working with Files in Python" where we'll learn:

Reading and writing text files

Working with CSV and JSON data

File paths and directory operations

Building a personal note-taking app

Your Error Handling Mission
This week, make your code more robust:

Add try/except to 3 places where your code could crash

Create a custom exception for your application

Practice reading error messages (don't just panic!)

Share in comments: What error did you successfully handle?

Wrapping Up
Today you learned how to write Python code that doesn't just crash and burn! You can now:

✅ Use try/except to handle expected errors

✅ Create custom exceptions for your domain

✅ Use else and finally for cleanup

✅ Debug errors instead of panicking

✅ Write production-ready, robust code

Remember: Good developers don't write code that never has errors - they write code that handles errors gracefully!

Your code will still have bugs, but now you have the tools to handle them like a pro!

What's the most creative error message you've seen or created? Share your error handling wins (or funny fails) in the comments!
