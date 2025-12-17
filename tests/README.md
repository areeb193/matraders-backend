# 🧪 SELENIUM AUTOMATED TESTING - MA TRADERS

## 📋 Test Files

1. **test_projects_page.py** - Tests for Projects page (http://localhost:3000/projects)
2. **test_backendadmin_page.py** - Tests for Backend Admin page with MongoDB connection (http://localhost:3000/backendadmin)

---

## 🚀 Setup Instructions

### Step 1: Install Python Dependencies

```powershell
cd tests
pip install -r requirements.txt
```

### Step 2: Install ChromeDriver (Automatic)

```powershell
pip install webdriver-manager
```

### Step 3: Start Your Application

Make sure your app is running:
```powershell
docker-compose up -d
# OR
npm run dev
```

Verify it's accessible:
- http://localhost:3000/projects
- http://localhost:3000/backendadmin

---

## 🎮 Running Tests

### Run Projects Page Tests
```powershell
cd tests
python test_projects_page.py
```

### Run Backend Admin Tests (with MongoDB)
```powershell
cd tests
python test_backendadmin_page.py
```

### Run Both Tests
```powershell
cd tests
python -m unittest test_projects_page.py test_backendadmin_page.py -v
```

---

## 📊 Test Cases

### **Test Suite 1: Projects Page** (test_projects_page.py)

1. **test_01_projects_page_loads**
   - Verifies page loads successfully
   - Checks URL and title
   - Takes screenshot

2. **test_02_projects_content_visible**
   - Verifies content elements are displayed
   - Checks for project cards/sections
   - Takes screenshot

3. **test_03_projects_navigation_works**
   - Verifies navigation elements exist
   - Checks links are functional
   - Takes screenshot

### **Test Suite 2: Backend Admin with MongoDB** (test_backendadmin_page.py)

1. **test_01_admin_page_loads**
   - Verifies backend admin page loads
   - Checks URL and content
   - Takes screenshot

2. **test_02_mongodb_connection_status**
   - **Waits up to 30 seconds** for MongoDB connection
   - Checks for connection indicators
   - Takes multiple screenshots during wait
   - Verifies connection status appears

3. **test_03_admin_interface_elements**
   - Verifies admin UI elements (buttons, forms, tables)
   - Checks navigation and controls
   - Takes screenshot

4. **test_04_mongodb_connection_stability**
   - Verifies connection remains stable over time
   - Checks for errors
   - Takes before/after screenshots

---

## 📸 Expected Output

### Projects Page Test:
```
================================================================================
SELENIUM TEST - PROJECTS PAGE
================================================================================

✅ Browser: Chrome
✅ Test URL: http://localhost:3000/projects
✅ Start Time: 2025-12-17 18:30:00

--------------------------------------------------------------------------------
TEST CASE 1: Projects Page Load
--------------------------------------------------------------------------------
→ Navigating to: http://localhost:3000/projects
→ Waiting for page to load...
→ Current URL: http://localhost:3000/projects
→ Page Title: MA Traders - Projects
→ Screenshot saved: test_01_projects_page_20251217_183005.png
✅ TEST PASSED: Projects page loaded successfully

...

================================================================================
TEST SUMMARY - PROJECTS PAGE
================================================================================
Total Tests: 3
Passed: 3
Failed: 0
Errors: 0
================================================================================
```

### Backend Admin Test:
```
================================================================================
SELENIUM TEST - BACKEND ADMIN PAGE (MongoDB Connection)
================================================================================

✅ Browser: Chrome
✅ Test URL: http://localhost:3000/backendadmin
✅ MongoDB Wait Time: 30s
✅ Start Time: 2025-12-17 18:35:00

--------------------------------------------------------------------------------
TEST CASE 2: MongoDB Connection Status Check
--------------------------------------------------------------------------------
→ Navigating to: http://localhost:3000/backendadmin
→ Page loaded, checking for MongoDB connection status...
→ Waiting up to 30s for MongoDB connection...
  ⏳ Checking... (0s elapsed)
  ⏳ Checking... (2s elapsed)
  ⏳ Checking... (4s elapsed)
  ✓ Found indicator: 'connected'
→ Total wait time: 5s
→ Final screenshot saved: test_02_mongodb_status_20251217_183540.png

→ Page Content Preview:
----------------------------------------
MongoDB Connection Status: Connected
Database: matraders
...
----------------------------------------

✅ TEST PASSED: MongoDB connection indicator found ('connected')
```

---

## 📁 Generated Screenshots

After running tests, you'll find screenshots in the `tests/` folder:

**Projects Page:**
- `test_01_projects_page_YYYYMMDD_HHMMSS.png`
- `test_02_projects_content_YYYYMMDD_HHMMSS.png`
- `test_03_projects_nav_YYYYMMDD_HHMMSS.png`

**Backend Admin:**
- `test_01_admin_page_YYYYMMDD_HHMMSS.png`
- `test_02_mongodb_status_YYYYMMDD_HHMMSS.png`
- `mongodb_status_10s.png` (interim screenshots during wait)
- `mongodb_status_20s.png`
- `test_03_admin_elements_YYYYMMDD_HHMMSS.png`
- `stability_initial_HHMMSS.png`
- `stability_after_HHMMSS.png`

---

## 🔧 Configuration

### Change MongoDB Wait Time

Edit `test_backendadmin_page.py`:
```python
cls.mongodb_wait_time = 30  # Change to 60 for slower connections
```

### Enable Headless Mode

Uncomment in both test files:
```python
chrome_options.add_argument('--headless')
```

### Change URLs

Edit the test files:
```python
cls.base_url = "http://localhost:3000"  # Change if needed
```

---

## 🐛 Troubleshooting

### Issue: ChromeDriver not found
```powershell
pip install webdriver-manager
```

### Issue: Application not running
```powershell
docker-compose ps
docker-compose up -d
```

### Issue: MongoDB connection timeout
- Increase wait time in test file
- Check MongoDB is running: `docker ps | grep mongo`
- Check logs: `docker-compose logs mongodb`

### Issue: Tests fail with element not found
- Increase `implicitly_wait` time in test files
- Check if page structure matches selectors
- Run in non-headless mode to see what's happening

---

## 📋 Submission Checklist

For academic submission:

- ✅ test_projects_page.py (3 test cases)
- ✅ test_backendadmin_page.py (4 test cases with MongoDB)
- ✅ requirements.txt
- ✅ Screenshots of test execution (console output)
- ✅ Generated screenshot files (7+ images)
- ✅ README.md (this file)

---

## 🎓 Academic Requirements Met

✅ **Minimum 3 test cases:** 7 test cases total (3 + 4)  
✅ **Homepage/page loads:** test_01 in both suites  
✅ **Form/element validation:** test_03 admin interface  
✅ **Navigation behavior:** test_03 projects navigation  
✅ **API/Backend response:** MongoDB connection check  
✅ **Screenshots included:** Auto-generated with timestamps  
✅ **Execution report:** Detailed console output

---

**Total Test Cases:** 7  
**Test Files:** 2  
**Coverage:** Projects Page + Backend Admin with MongoDB  
**Special Feature:** MongoDB connection wait with 30s timeout
