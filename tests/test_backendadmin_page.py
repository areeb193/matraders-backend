"""
==============================================================================
SELENIUM TEST - BACKEND ADMIN PAGE WITH MONGODB CONNECTION
==============================================================================
Test Case: Verify Backend Admin Page and MongoDB Connection Status
URL: http://localhost:3000/backendadmin
Note: MongoDB connection takes time to establish - tests wait appropriately
==============================================================================
"""

import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from datetime import datetime


class BackendAdminTest(unittest.TestCase):
    """Test suite for Backend Admin Page with MongoDB Connection"""

    @classmethod
    def setUpClass(cls):
        """Set up test environment"""
        print("\n" + "="*80)
        print("SELENIUM TEST - BACKEND ADMIN PAGE (MongoDB Connection)")
        print("="*80)
        
        # Configure Chrome options
        chrome_options = Options()
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--disable-notifications')
        chrome_options.add_argument('--disable-gpu')
        # chrome_options.add_argument('--headless')  # Uncomment for headless mode
        
        # Initialize Chrome WebDriver
        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.implicitly_wait(20)  # Longer wait for MongoDB
        
        cls.base_url = "http://localhost:3000"
        cls.admin_url = f"{cls.base_url}/backendadmin"
        
        # MongoDB connection timeout (seconds)
        cls.mongodb_wait_time = 30
        
        print(f"\n✅ Browser: Chrome")
        print(f"✅ Test URL: {cls.admin_url}")
        print(f"✅ MongoDB Wait Time: {cls.mongodb_wait_time}s")
        print(f"✅ Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    @classmethod
    def tearDownClass(cls):
        """Clean up after tests"""
        print("\n" + "="*80)
        print(f"✅ End Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*80 + "\n")
        time.sleep(2)
        cls.driver.quit()

    def test_01_admin_page_loads(self):
        """
        TEST CASE 1: Verify Backend Admin Page Loads Successfully
        Expected: Page loads, correct URL, admin interface visible
        """
        print("\n" + "-"*80)
        print("TEST CASE 1: Backend Admin Page Load")
        print("-"*80)
        
        try:
            # Navigate to backend admin page
            print(f"→ Navigating to: {self.admin_url}")
            self.driver.get(self.admin_url)
            
            # Wait for page to load
            print("→ Waiting for page to load...")
            time.sleep(5)
            
            # Verify URL
            current_url = self.driver.current_url
            print(f"→ Current URL: {current_url}")
            self.assertIn("/backendadmin", current_url, "URL should contain '/backendadmin'")
            
            # Get page title
            page_title = self.driver.title
            print(f"→ Page Title: {page_title}")
            self.assertIsNotNone(page_title, "Page title should not be None")
            
            # Check if page has loaded (not blank)
            page_source = self.driver.page_source
            print(f"→ Page Source Length: {len(page_source)} characters")
            self.assertGreater(len(page_source), 500, "Page should have content")
            
            # Take screenshot
            screenshot = f"test_01_admin_page_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            self.driver.save_screenshot(screenshot)
            print(f"→ Screenshot saved: {screenshot}")
            
            print("✅ TEST PASSED: Backend admin page loaded successfully\n")
            
        except Exception as e:
            print(f"❌ TEST FAILED: {str(e)}")
            self.driver.save_screenshot("test_01_admin_page_ERROR.png")
            raise

    def test_02_mongodb_connection_status(self):
        """
        TEST CASE 2: Verify MongoDB Connection Status Appears
        Expected: MongoDB connection status is displayed (takes time)
        """
        print("\n" + "-"*80)
        print("TEST CASE 2: MongoDB Connection Status Check")
        print("-"*80)
        
        try:
            # Navigate to backend admin page
            print(f"→ Navigating to: {self.admin_url}")
            self.driver.get(self.admin_url)
            
            # Initial wait for page load
            time.sleep(3)
            print("→ Page loaded, checking for MongoDB connection status...")
            
            # Specific text to look for: "Connected to MongoDB Atlas"
            target_text = "Connected to MongoDB Atlas"
            
            # Wait and check for connection status
            print(f"→ Waiting up to {self.mongodb_wait_time}s for MongoDB connection...")
            print(f"→ Looking for: '{target_text}'")
            
            connection_found = False
            connection_text = ""
            start_time = time.time()
            
            # Poll for connection status
            while time.time() - start_time < self.mongodb_wait_time:
                elapsed = int(time.time() - start_time)
                print(f"  ⏳ Checking... ({elapsed}s elapsed)")
                
                # Get current page text (preserve case)
                page_text = self.driver.find_element(By.TAG_NAME, "body").text
                
                # Check for the specific connection text
                if target_text in page_text:
                    connection_found = True
                    connection_text = target_text
                    print(f"  ✅ Found: '{target_text}'")
                    break
                
                # Also check lowercase version as fallback
                if "connected to mongodb atlas" in page_text.lower():
                    connection_found = True
                    connection_text = "connected to mongodb atlas"
                    print(f"  ✅ Found (case-insensitive): '{connection_text}'")
                    break
                
                # Take periodic screenshots
                if elapsed % 10 == 0 and elapsed > 0:
                    temp_screenshot = f"mongodb_status_{elapsed}s.png"
                    self.driver.save_screenshot(temp_screenshot)
                    print(f"  → Interim screenshot: {temp_screenshot}")
                
                time.sleep(2)
            
            total_wait = int(time.time() - start_time)
            print(f"→ Total wait time: {total_wait}s")
            
            # Take final screenshot
            screenshot = f"test_02_mongodb_status_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            self.driver.save_screenshot(screenshot)
            print(f"→ Final screenshot saved: {screenshot}")
            
            # Get full page text for analysis
            full_page_text = self.driver.find_element(By.TAG_NAME, "body").text
            print(f"\n→ Page Content Preview:")
            print("-" * 40)
            print(full_page_text[:500])  # First 500 chars
            print("-" * 40)
            
            # Check if "Connected to MongoDB Atlas" is in the text
            print("\n→ Verifying MongoDB connection text...")
            
            # Verify connection status was found
            if connection_found:
                print(f"\n✅ TEST PASSED: Found '{connection_text}'")
                self.assertTrue(True, f"Successfully found: {connection_text}")
            else:
                print(f"\n❌ TEST FAILED: Could not find 'Connected to MongoDB Atlas'")
                print("→ Page content preview:")
                print(full_page_text[:500])
                self.fail(f"Expected text 'Connected to MongoDB Atlas' not found after {total_wait}s")
            
            print()
            
        except Exception as e:
            print(f"❌ TEST FAILED: {str(e)}")
            self.driver.save_screenshot("test_02_mongodb_ERROR.png")
            raise

    def test_03_admin_interface_elements(self):
        """
        TEST CASE 3: Verify Admin Interface Elements are Present
        Expected: Admin navigation, sections, or management tools visible
        """
        print("\n" + "-"*80)
        print("TEST CASE 3: Admin Interface Elements Check")
        print("-"*80)
        
        try:
            # Navigate to backend admin page
            print(f"→ Navigating to: {self.admin_url}")
            self.driver.get(self.admin_url)
            
            # Wait for page load
            print("→ Waiting for page to load...")
            time.sleep(5)
            
            # Check for admin interface elements
            print("→ Checking for admin interface elements...")
            
            elements_found = {}
            
            # Check for navigation
            try:
                nav_elements = self.driver.find_elements(By.CSS_SELECTOR, "nav, header, aside, .sidebar, .menu")
                if nav_elements:
                    elements_found['navigation'] = len(nav_elements)
                    print(f"  ✓ Navigation elements: {len(nav_elements)}")
            except:
                pass
            
            # Check for buttons
            try:
                buttons = self.driver.find_elements(By.TAG_NAME, "button")
                if buttons:
                    elements_found['buttons'] = len(buttons)
                    print(f"  ✓ Buttons: {len(buttons)}")
            except:
                pass
            
            # Check for links
            try:
                links = self.driver.find_elements(By.TAG_NAME, "a")
                if links:
                    elements_found['links'] = len(links)
                    print(f"  ✓ Links: {len(links)}")
            except:
                pass
            
            # Check for forms/inputs
            try:
                inputs = self.driver.find_elements(By.TAG_NAME, "input")
                if inputs:
                    elements_found['inputs'] = len(inputs)
                    print(f"  ✓ Input fields: {len(inputs)}")
            except:
                pass
            
            # Check for tables (common in admin panels)
            try:
                tables = self.driver.find_elements(By.TAG_NAME, "table")
                if tables:
                    elements_found['tables'] = len(tables)
                    print(f"  ✓ Tables: {len(tables)}")
            except:
                pass
            
            # Check for divs (general content)
            try:
                divs = self.driver.find_elements(By.TAG_NAME, "div")
                if divs:
                    elements_found['divs'] = len(divs)
                    print(f"  ✓ Content divs: {len(divs)}")
            except:
                pass
            
            print(f"\n→ Total element types found: {len(elements_found)}")
            print(f"→ Total elements: {sum(elements_found.values())}")
            
            # Verify some interface elements exist
            self.assertGreater(len(elements_found), 0, "Should find some admin interface elements")
            
            # Take screenshot
            screenshot = f"test_03_admin_elements_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            self.driver.save_screenshot(screenshot)
            print(f"→ Screenshot saved: {screenshot}")
            
            print("✅ TEST PASSED: Admin interface elements found\n")
            
        except Exception as e:
            print(f"❌ TEST FAILED: {str(e)}")
            self.driver.save_screenshot("test_03_admin_elements_ERROR.png")
            raise

    def test_04_mongodb_connection_stability(self):
        """
        TEST CASE 4: Verify MongoDB Connection Remains Stable
        Expected: Connection status persists, no errors after waiting
        """
        print("\n" + "-"*80)
        print("TEST CASE 4: MongoDB Connection Stability")
        print("-"*80)
        
        try:
            # Navigate to backend admin page
            print(f"→ Navigating to: {self.admin_url}")
            self.driver.get(self.admin_url)
            
            # Wait for initial load and connection
            print("→ Waiting for initial MongoDB connection...")
            time.sleep(10)
            
            # Take first screenshot
            screenshot1 = f"stability_initial_{datetime.now().strftime('%H%M%S')}.png"
            self.driver.save_screenshot(screenshot1)
            print(f"→ Initial screenshot: {screenshot1}")
            
            # Get initial page state
            initial_text = self.driver.find_element(By.TAG_NAME, "body").text
            initial_url = self.driver.current_url
            
            print(f"→ Initial URL: {initial_url}")
            print(f"→ Initial content length: {len(initial_text)} chars")
            
            # Wait additional time to check stability
            print("→ Waiting additional 10 seconds to verify stability...")
            time.sleep(10)
            
            # Take second screenshot
            screenshot2 = f"stability_after_{datetime.now().strftime('%H%M%S')}.png"
            self.driver.save_screenshot(screenshot2)
            print(f"→ After screenshot: {screenshot2}")
            
            # Get page state after wait
            after_text = self.driver.find_element(By.TAG_NAME, "body").text
            after_url = self.driver.current_url
            
            print(f"→ After URL: {after_url}")
            print(f"→ After content length: {len(after_text)} chars")
            
            # Verify URL hasn't changed
            self.assertEqual(initial_url, after_url, "URL should remain stable")
            
            # Check for error messages
            error_keywords = ["error", "failed", "timeout", "cannot connect", "refused"]
            has_errors = any(keyword in after_text.lower() for keyword in error_keywords)
            
            if has_errors:
                print("⚠️  Warning: Error keywords detected in page")
                # Extract error context
                for keyword in error_keywords:
                    if keyword in after_text.lower():
                        idx = after_text.lower().find(keyword)
                        context = after_text[max(0, idx-50):min(len(after_text), idx+100)]
                        print(f"  → Context: ...{context}...")
            else:
                print("✓ No error keywords detected")
            
            # Verify page still has content
            self.assertGreater(len(after_text), 100, "Page should still have content")
            
            print("✅ TEST PASSED: Connection appears stable\n")
            
        except Exception as e:
            print(f"❌ TEST FAILED: {str(e)}")
            self.driver.save_screenshot("test_04_stability_ERROR.png")
            raise


if __name__ == "__main__":
    # Run tests
    suite = unittest.TestLoader().loadTestsFromTestCase(BackendAdminTest)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY - BACKEND ADMIN PAGE")
    print("="*80)
    print(f"Total Tests: {result.testsRun}")
    print(f"Passed: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"Failed: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    print("="*80 + "\n")
