#!/usr/bin/env python3
"""
Backend API Testing Suite for Portfolio Application
Tests all portfolio and analytics endpoints
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

# Backend URL from environment
BACKEND_URL = "https://codefolio-201.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, endpoint: str, status: str, message: str, response_data: Any = None):
        """Log test results"""
        result = {
            "endpoint": endpoint,
            "status": status,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        print(f"[{status}] {endpoint}: {message}")
        
    def test_get_projects(self):
        """Test GET /api/portfolio/projects"""
        endpoint = "/portfolio/projects"
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "projects" in data and "count" in data:
                    if isinstance(data["projects"], list) and isinstance(data["count"], int):
                        self.log_test(endpoint, "PASS", 
                                    f"Response structure valid. Found {data['count']} projects", 
                                    data)
                        
                        # Check if projects have required fields
                        if data["projects"]:
                            project = data["projects"][0]
                            required_fields = ["id", "title", "shortDesc", "description", "techStack"]
                            missing_fields = [field for field in required_fields if field not in project]
                            
                            if missing_fields:
                                self.log_test(endpoint, "WARN", 
                                            f"Projects missing fields: {missing_fields}")
                            else:
                                self.log_test(endpoint, "PASS", "Project structure valid")
                        else:
                            self.log_test(endpoint, "WARN", "No projects found in database")
                    else:
                        self.log_test(endpoint, "FAIL", 
                                    f"Invalid response structure. Expected list and int, got {type(data['projects'])}, {type(data['count'])}")
                else:
                    self.log_test(endpoint, "FAIL", 
                                f"Missing required fields 'projects' or 'count' in response: {list(data.keys())}")
            else:
                self.log_test(endpoint, "FAIL", 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test(endpoint, "ERROR", f"Invalid JSON response: {str(e)}")
            
    def test_get_skills(self):
        """Test GET /api/portfolio/skills"""
        endpoint = "/portfolio/skills"
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "skills" in data:
                    if isinstance(data["skills"], dict):
                        self.log_test(endpoint, "PASS", 
                                    f"Response structure valid. Found {len(data['skills'])} skill categories", 
                                    data)
                        
                        # Check if skills are properly grouped
                        for category, skills in data["skills"].items():
                            if not isinstance(skills, list):
                                self.log_test(endpoint, "WARN", 
                                            f"Skills for category '{category}' should be a list, got {type(skills)}")
                                break
                        else:
                            self.log_test(endpoint, "PASS", "Skills properly grouped by category")
                    else:
                        self.log_test(endpoint, "FAIL", 
                                    f"Skills should be a dict, got {type(data['skills'])}")
                else:
                    self.log_test(endpoint, "FAIL", 
                                f"Missing 'skills' field in response: {list(data.keys())}")
            else:
                self.log_test(endpoint, "FAIL", 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test(endpoint, "ERROR", f"Invalid JSON response: {str(e)}")
            
    def test_get_experience(self):
        """Test GET /api/portfolio/experience"""
        endpoint = "/portfolio/experience"
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "experience" in data and "count" in data:
                    if isinstance(data["experience"], list) and isinstance(data["count"], int):
                        self.log_test(endpoint, "PASS", 
                                    f"Response structure valid. Found {data['count']} experience items", 
                                    data)
                        
                        # Check if experience items have basic structure
                        if data["experience"]:
                            exp_item = data["experience"][0]
                            if isinstance(exp_item, dict):
                                self.log_test(endpoint, "PASS", "Experience items structure valid")
                            else:
                                self.log_test(endpoint, "WARN", 
                                            f"Experience item should be dict, got {type(exp_item)}")
                        else:
                            self.log_test(endpoint, "WARN", "No experience items found in database")
                    else:
                        self.log_test(endpoint, "FAIL", 
                                    f"Invalid response structure. Expected list and int, got {type(data['experience'])}, {type(data['count'])}")
                else:
                    self.log_test(endpoint, "FAIL", 
                                f"Missing required fields 'experience' or 'count' in response: {list(data.keys())}")
            else:
                self.log_test(endpoint, "FAIL", 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test(endpoint, "ERROR", f"Invalid JSON response: {str(e)}")
            
    def test_get_contact(self):
        """Test GET /api/portfolio/contact"""
        endpoint = "/portfolio/contact"
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check if response is a dict (contact info object)
                if isinstance(data, dict):
                    self.log_test(endpoint, "PASS", 
                                "Contact info retrieved successfully", 
                                data)
                    
                    # Check for common contact fields
                    common_fields = ["email", "phone", "location", "linkedin", "github"]
                    found_fields = [field for field in common_fields if field in data]
                    
                    if found_fields:
                        self.log_test(endpoint, "PASS", 
                                    f"Contact info contains fields: {found_fields}")
                    else:
                        self.log_test(endpoint, "WARN", 
                                    f"No common contact fields found. Available fields: {list(data.keys())}")
                else:
                    self.log_test(endpoint, "FAIL", 
                                f"Contact info should be a dict, got {type(data)}")
            elif response.status_code == 404:
                self.log_test(endpoint, "FAIL", 
                            "Contact info not found in database (404)")
            else:
                self.log_test(endpoint, "FAIL", 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test(endpoint, "ERROR", f"Invalid JSON response: {str(e)}")
            
    def test_post_pageview(self):
        """Test POST /api/analytics/pageview"""
        endpoint = "/analytics/pageview"
        url = f"{self.base_url}{endpoint}"
        
        # Test data as specified in the request
        test_data = {
            "path": "/",
            "userAgent": "test-agent"
        }
        
        try:
            response = self.session.post(url, json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "success" in data and "message" in data:
                    if data["success"] is True:
                        self.log_test(endpoint, "PASS", 
                                    f"Page view logged successfully: {data['message']}", 
                                    data)
                    else:
                        self.log_test(endpoint, "FAIL", 
                                    f"Page view logging failed: success={data['success']}")
                else:
                    self.log_test(endpoint, "FAIL", 
                                f"Invalid response structure. Expected 'success' and 'message' fields: {list(data.keys())}")
            else:
                self.log_test(endpoint, "FAIL", 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test(endpoint, "ERROR", f"Invalid JSON response: {str(e)}")
            
    def test_analytics_stats(self):
        """Test GET /api/analytics/stats (bonus test)"""
        endpoint = "/analytics/stats"
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                expected_fields = ["total_views", "unique_paths", "paths"]
                if all(field in data for field in expected_fields):
                    self.log_test(endpoint, "PASS", 
                                f"Analytics stats retrieved: {data['total_views']} total views, {data['unique_paths']} unique paths", 
                                data)
                else:
                    missing_fields = [field for field in expected_fields if field not in data]
                    self.log_test(endpoint, "FAIL", 
                                f"Missing fields in analytics stats: {missing_fields}")
            else:
                self.log_test(endpoint, "FAIL", 
                            f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test(endpoint, "ERROR", f"Invalid JSON response: {str(e)}")
            
    def run_all_tests(self):
        """Run all API tests"""
        print(f"Starting Portfolio API Tests")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test all required endpoints
        self.test_get_projects()
        self.test_get_skills()
        self.test_get_experience()
        self.test_get_contact()
        self.test_post_pageview()
        
        # Bonus test
        self.test_analytics_stats()
        
        print("=" * 60)
        self.print_summary()
        
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = len([r for r in self.test_results if r["status"] == "FAIL"])
        error_tests = len([r for r in self.test_results if r["status"] == "ERROR"])
        warn_tests = len([r for r in self.test_results if r["status"] == "WARN"])
        
        print(f"TEST SUMMARY:")
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Errors: {error_tests}")
        print(f"Warnings: {warn_tests}")
        
        if failed_tests > 0 or error_tests > 0:
            print("\nFAILED/ERROR TESTS:")
            for result in self.test_results:
                if result["status"] in ["FAIL", "ERROR"]:
                    print(f"  {result['endpoint']}: {result['message']}")
                    
        return {
            "total": total_tests,
            "passed": passed_tests,
            "failed": failed_tests,
            "errors": error_tests,
            "warnings": warn_tests,
            "success_rate": (passed_tests / total_tests * 100) if total_tests > 0 else 0
        }

if __name__ == "__main__":
    tester = PortfolioAPITester()
    tester.run_all_tests()
    
    # Exit with error code if tests failed
    summary = tester.print_summary()
    if summary["failed"] > 0 or summary["errors"] > 0:
        sys.exit(1)
    else:
        sys.exit(0)