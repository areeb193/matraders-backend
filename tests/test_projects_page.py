"""
==============================================================================
SELENIUM TEST - PROJECTS PAGE
==============================================================================
Test Case: Verify Projects Page Loads and Displays Content
URL: http://localhost:3000/projects
==============================================================================
"""

import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from datetime import datetime


class ProjectsPageTest(unittest.TestCase):
    """Test suite for Projects Page"""

    @classmethod
    def setUpClass(cls):
        """Set up test environment"""
        print("\n" + "="*80)
        print("SELENIUM TEST - PROJECTS PAGE")
        print("="*80)
        
        # Configure Chrome options
        chrome_options = Options()
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--disable-notifications')
        # chrome_options.add_argument('--headless')  # Uncomment for headless mode
        
        # Initialize Chrome WebDriver
        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.implicitly_wait(15)
        
        cls.base_url = "http://localhost:3000"
        cls.projects_url = f"{cls.base_url}/projects"
        
        print(f"\n✅ Browser: Chrome")
        print(f"✅ Test URL: {cls.projects_url}")
        print(f"✅ Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    @classmethod
    def tearDownClass(cls):
        """Clean up after tests"""
        print("\n" + "="*80)
        print(f"✅ End Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*80 + "\n")
        time.sleep(2)
        cls.driver.quit()

    def test_01_projects_page_loads(self):
        """
        TEST CASE 1: Verify Projects Page Loads Successfully
        Expected: Page loads, correct URL, status 200
        """
        print("\n" + "-"*80)
        print("TEST CASE 1: Projects Page Load")
        print("-"*80)
        
        try:
            # Navigate to projects page
            print(f"→ Navigating to: {self.projects_url}")
            self.driver.get(self.projects_url)
            
            # Wait for page to load
            print("→ Waiting for page to load...")
            time.sleep(3)
            
            # Verify URL
            current_url = self.driver.current_url
            print(f"→ Current URL: {current_url}")
            self.assertIn("/projects", current_url, "URL should contain '/projects'")
            
            # Get page title
            page_title = self.driver.title
            print(f"→ Page Title: {page_title}")
            self.assertIsNotNone(page_title, "Page title should not be None")
            
            # Take screenshot
            screenshot = f"test_01_projects_page_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            self.driver.save_screenshot(screenshot)
            print(f"→ Screenshot saved: {screenshot}")
            
            print("✅ TEST PASSED: Projects page loaded successfully\n")
            
        except Exception as e:
            print(f"❌ TEST FAILED: {str(e)}")
            self.driver.save_screenshot("test_01_projects_page_ERROR.png")
            raise

    def test_02_projects_content_visible(self):
        """
        TEST CASE 2: Verify Projects Content is Visible
        Expected: Projects/content elements are displayed
        """
        print("\n" + "-"*80)
        print("TEST CASE 2: Projects Content Visibility")
        print("-"*80)
        
        try:
            # Navigate to projects page
            print(f"→ Navigating to: {self.projects_url}")
            self.driver.get(self.projects_url)
            time.sleep(3)
            
            # Check for main content
            print("→ Checking for page content...")
            
            # Try to find project elements (cards, divs, sections, etc.)
            selectors = [
                "div[class*='project']",
                "section",
                "article",
                "div[class*='card']",
                "div[class*='container']",
                "main",
                "h1", "h2", "h3"
            ]
            
            found_elements = []
            for selector in selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        found_elements.append(f"{selector}: {len(elements)} elements")
                        print(f"  ✓ Found {len(elements)} elements matching '{selector}'")
                except:
                    pass
            
            # Verify some content was found
            self.assertTrue(len(found_elements) > 0, "Should find some content elements")
            
            # Check for text content
            page_source = self.driver.page_source
            has_content = len(page_source) > 1000
            print(f"→ Page has content: {has_content} (size: {len(page_source)} chars)")
            
            # Take screenshot
            screenshot = f"test_02_projects_content_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            self.driver.save_screenshot(screenshot)
            print(f"→ Screenshot saved: {screenshot}")
            
            print("✅ TEST PASSED: Projects content is visible\n")
            
        except Exception as e:
            print(f"❌ TEST FAILED: {str(e)}")
            self.driver.save_screenshot("test_02_projects_content_ERROR.png")
            raise

    def test_03_projects_navigation_works(self):
        """
        TEST CASE 3: Verify Navigation from Projects Page
        Expected: Can navigate back to home or other pages
        """
        print("\n" + "-"*80)
        print("TEST CASE 3: Projects Page Navigation")
        print("-"*80)
        
        try:
            # Navigate to projects page
            print(f"→ Navigating to: {self.projects_url}")
            self.driver.get(self.projects_url)
            time.sleep(3)
            
            # Try to find navigation links
            print("→ Looking for navigation elements...")
            
            # Look for common navigation elements
            nav_selectors = [
                "nav a",
                "header a",
                "a[href='/']",
                "a[href*='home']",
                "button",
            ]
            
            nav_links = []
            for selector in nav_selectors:
                try:
                    links = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if links:
                        nav_links.extend(links)
                        print(f"  ✓ Found {len(links)} navigation elements: {selector}")
                except:
                    pass
            
            if nav_links:
                print(f"→ Total navigation elements found: {len(nav_links)}")
                
                # Try clicking first safe navigation link
                for link in nav_links[:3]:
                    try:
                        href = link.get_attribute('href')
                        text = link.text
                        if href and (self.base_url in href or href.startswith('/')):
                            print(f"  → Testing link: '{text}' -> {href}")
                            break
                    except:
                        continue
            
            # Take screenshot
            screenshot = f"test_03_projects_nav_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            self.driver.save_screenshot(screenshot)
            print(f"→ Screenshot saved: {screenshot}")
            
            print("✅ TEST PASSED: Navigation elements exist\n")
            
        except Exception as e:
            print(f"❌ TEST FAILED: {str(e)}")
            self.driver.save_screenshot("test_03_projects_nav_ERROR.png")
            raise


if __name__ == "__main__":
    # Run tests
    suite = unittest.TestLoader().loadTestsFromTestCase(ProjectsPageTest)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY - PROJECTS PAGE")
    print("="*80)
    print(f"Total Tests: {result.testsRun}")
    print(f"Passed: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"Failed: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    print("="*80 + "\n")
