import requests
import sys
import re
from datetime import datetime

def check_element_exists(html, pattern):
    """Check if a pattern exists in the HTML"""
    return bool(re.search(pattern, html))

def main():
    """Test the Axxi Interactive Application"""
    print("🔍 Testing Axxi Interactive Application")
    
    try:
        # Get the main page
        response = requests.get("http://localhost:5174")
        if response.status_code != 200:
            print(f"❌ Failed to load page: Status code {response.status_code}")
            return 1
        
        html = response.text
        print("✅ Page loaded successfully")
        
        # Check for key elements
        elements_to_check = [
            ("🚀 Axxi Interactive App", "Page title"),
            ("Counter Functions", "Counter section"),
            ("Interactive Controls", "Controls section"),
            ("Welcome to Axxi", "Initial status message"),
            ("➕ Increment", "Increment button"),
            ("➖ Decrement", "Decrement button"),
            ("🔄 Reset", "Reset button"),
            ("🎨 Change Theme Color", "Theme button"),
            ("📋 Open Modal Dialog", "Modal button"),
            ("🎲 Random Message", "Random message button"),
            ("Working Buttons", "Feature card 1"),
            ("State Management", "Feature card 2"),
            ("Dynamic Styling", "Feature card 3"),
            ("Responsive Design", "Feature card 4")
        ]
        
        all_elements_found = True
        for pattern, description in elements_to_check:
            if check_element_exists(html, re.escape(pattern)):
                print(f"✅ Found {description}")
            else:
                print(f"❌ Missing {description}")
                all_elements_found = False
        
        # Check for interactive elements (buttons with onClick handlers)
        if check_element_exists(html, r'onClick={handle(Increment|Decrement|Reset)}'):
            print("✅ Counter buttons have onClick handlers")
        else:
            print("❌ Counter buttons missing onClick handlers")
            all_elements_found = False
            
        if check_element_exists(html, r'onClick={(changeColor|openModal)}'):
            print("✅ Interactive control buttons have onClick handlers")
        else:
            print("❌ Interactive control buttons missing onClick handlers")
            all_elements_found = False
            
        # Check for modal dialog
        if check_element_exists(html, r'showModal && \('):
            print("✅ Modal dialog is conditionally rendered")
        else:
            print("❌ Modal dialog implementation is missing")
            all_elements_found = False
            
        # Check for theme implementation
        if check_element_exists(html, r'currentTheme\.(bg|text|button|counter|border)'):
            print("✅ Theme implementation is present")
        else:
            print("❌ Theme implementation is missing")
            all_elements_found = False
            
        # Final result
        if all_elements_found:
            print("\n✅ All required elements found in the application")
            print("✅ The application appears to be fully functional")
            return 0
        else:
            print("\n⚠️ Some elements are missing from the application")
            return 1
            
    except Exception as e:
        print(f"❌ Error testing application: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())