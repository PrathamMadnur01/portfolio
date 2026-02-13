#!/usr/bin/env python3
"""
Database Optimization Verification Test
Specifically tests that _id, createdAt, updatedAt fields are excluded from responses
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from environment
BACKEND_URL = "https://codefolio-201.preview.emergentagent.com/api"

class OptimizationVerifier:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, endpoint: str, status: str, message: str, details: str = ""):
        """Log test results"""
        result = {
            "endpoint": endpoint,
            "status": status,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"[{status}] {endpoint}: {message}")
        if details:
            print(f"    Details: {details}")
            
    def check_excluded_fields(self, data, endpoint, excluded_fields):
        """Check that specified fields are not present in the response"""
        issues = []
        
        def check_object(obj, path=""):
            if isinstance(obj, dict):
                for field in excluded_fields:
                    if field in obj:
                        issues.append(f"{path}.{field}" if path else field)
                
                for key, value in obj.items():
                    new_path = f"{path}.{key}" if path else key
                    check_object(value, new_path)
                    
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    new_path = f"{path}[{i}]" if path else f"[{i}]"
                    check_object(item, new_path)
        
        check_object(data)
        
        if issues:
            self.log_test(endpoint, "FAIL", 
                         f"Found excluded fields: {', '.join(issues)}")
            return False
        else:
            self.log_test(endpoint, "PASS", 
                         f"No excluded fields found ({', '.join(excluded_fields)})")
            return True
            
    def verify_projects_optimization(self):
        """Verify GET /api/portfolio/projects excludes _id, createdAt, updatedAt"""
        endpoint = "/portfolio/projects"
        url = f"{self.base_url}{endpoint}"
        excluded_fields = ["_id", "createdAt", "updatedAt"]
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test(endpoint, "PASS", f"HTTP 200 OK - {data.get('count', 0)} projects returned")
                
                # Check for excluded fields
                self.check_excluded_fields(data, endpoint, excluded_fields)
                
                # Verify structure
                if "projects" in data and isinstance(data["projects"], list):
                    if data["projects"]:
                        project = data["projects"][0]
                        required_fields = ["id", "title", "shortDesc", "description", "techStack"]
                        present_fields = [f for f in required_fields if f in project]
                        self.log_test(endpoint, "PASS", 
                                     f"Required fields present: {', '.join(present_fields)}")
                        
            else:
                self.log_test(endpoint, "FAIL", f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
            
    def verify_skills_optimization(self):
        """Verify GET /api/portfolio/skills excludes _id field"""
        endpoint = "/portfolio/skills"
        url = f"{self.base_url}{endpoint}"
        excluded_fields = ["_id"]
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test(endpoint, "PASS", f"HTTP 200 OK - {len(data.get('skills', {}))} skill categories")
                
                # Check for excluded fields
                self.check_excluded_fields(data, endpoint, excluded_fields)
                
            else:
                self.log_test(endpoint, "FAIL", f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
            
    def verify_experience_optimization(self):
        """Verify GET /api/portfolio/experience excludes _id field"""
        endpoint = "/portfolio/experience"
        url = f"{self.base_url}{endpoint}"
        excluded_fields = ["_id"]
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test(endpoint, "PASS", f"HTTP 200 OK - {data.get('count', 0)} experience items")
                
                # Check for excluded fields
                self.check_excluded_fields(data, endpoint, excluded_fields)
                
            else:
                self.log_test(endpoint, "FAIL", f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
            
    def verify_contact_optimization(self):
        """Verify GET /api/portfolio/contact excludes _id and isActive fields"""
        endpoint = "/portfolio/contact"
        url = f"{self.base_url}{endpoint}"
        excluded_fields = ["_id", "isActive"]
        
        try:
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test(endpoint, "PASS", "HTTP 200 OK - Contact info retrieved")
                
                # Check for excluded fields
                self.check_excluded_fields(data, endpoint, excluded_fields)
                
                # Verify expected fields are present
                expected_fields = ["email", "linkedin", "github"]
                present_fields = [f for f in expected_fields if f in data]
                if present_fields:
                    self.log_test(endpoint, "PASS", 
                                 f"Expected contact fields present: {', '.join(present_fields)}")
                
            else:
                self.log_test(endpoint, "FAIL", f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
            
    def verify_pageview_functionality(self):
        """Verify POST /api/analytics/pageview still works correctly"""
        endpoint = "/analytics/pageview"
        url = f"{self.base_url}{endpoint}"
        
        test_data = {
            "path": "/optimization-test",
            "userAgent": "optimization-verification-test"
        }
        
        try:
            response = self.session.post(url, json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get("success") is True:
                    self.log_test(endpoint, "PASS", 
                                 f"HTTP 200 OK - {data.get('message', 'Success')}")
                else:
                    self.log_test(endpoint, "FAIL", 
                                 f"Success field is {data.get('success')}")
                    
            else:
                self.log_test(endpoint, "FAIL", f"HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test(endpoint, "ERROR", f"Request failed: {str(e)}")
            
    def verify_dependency_injection(self):
        """Verify database connection works with new dependency injection pattern"""
        # Test multiple endpoints to ensure DB connection is stable
        endpoints_to_test = [
            "/portfolio/projects",
            "/portfolio/skills", 
            "/portfolio/experience",
            "/portfolio/contact"
        ]
        
        successful_connections = 0
        
        for endpoint in endpoints_to_test:
            url = f"{self.base_url}{endpoint}"
            try:
                response = self.session.get(url, timeout=5)
                if response.status_code == 200:
                    successful_connections += 1
            except:
                pass
                
        if successful_connections == len(endpoints_to_test):
            self.log_test("dependency_injection", "PASS", 
                         f"Database dependency injection working - {successful_connections}/{len(endpoints_to_test)} endpoints responsive")
        else:
            self.log_test("dependency_injection", "FAIL", 
                         f"Database connection issues - {successful_connections}/{len(endpoints_to_test)} endpoints responsive")
            
    def run_optimization_verification(self):
        """Run all optimization verification tests"""
        print("Database Optimization Verification Test")
        print(f"Backend URL: {self.base_url}")
        print("=" * 70)
        
        # Test all required optimizations
        self.verify_projects_optimization()
        self.verify_skills_optimization() 
        self.verify_experience_optimization()
        self.verify_contact_optimization()
        self.verify_pageview_functionality()
        self.verify_dependency_injection()
        
        print("=" * 70)
        self.print_summary()
        
    def print_summary(self):
        """Print test summary"""
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = len([r for r in self.test_results if r["status"] == "FAIL"])
        error_tests = len([r for r in self.test_results if r["status"] == "ERROR"])
        
        print(f"OPTIMIZATION VERIFICATION SUMMARY:")
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Errors: {error_tests}")
        
        if failed_tests > 0 or error_tests > 0:
            print("\nFAILED/ERROR TESTS:")
            for result in self.test_results:
                if result["status"] in ["FAIL", "ERROR"]:
                    print(f"  {result['endpoint']}: {result['message']}")
                    if result["details"]:
                        print(f"    {result['details']}")
                        
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        return {
            "total": total_tests,
            "passed": passed_tests,
            "failed": failed_tests,
            "errors": error_tests,
            "success_rate": success_rate
        }

if __name__ == "__main__":
    verifier = OptimizationVerifier()
    verifier.run_optimization_verification()
    
    # Exit with error code if tests failed
    summary = verifier.print_summary()
    if summary["failed"] > 0 or summary["errors"] > 0:
        sys.exit(1)
    else:
        sys.exit(0)