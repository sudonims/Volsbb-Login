#Automated login for Volsbb Wifi...VIT campus...(Vellore)
from selenium import webdriver
from time import sleep

driver=webdriver.Chrome(r'chromedriver/path') #Enter the path of chromedriver
driver.get('http://phc.prontonetworks.com/cgi-bin/authlogin?URI=http://www.gstatic.com/generate_204')
print 'opened' #!?Parantheses 
sleep(1)
passwd=driver.find_element_by_name('password')
user=driver.find_element_by_name('userId')
user.send_keys('USER_NAME') #Replace the text with your username 
sleep(1)
passwd.send_keys('PASSWORD') #Replace the text with your password
sleep(1)
login=driver.find_element_by_name('Submit22')
login.click()
print 'done' #!?Parantheses...
sleep(3)
driver.quit()

#Made by Nimish Tarang Shah.
#Special thanks to google and Volsbb login(for idea).

