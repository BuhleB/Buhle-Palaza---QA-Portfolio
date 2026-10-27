Run-Test `
    -TestID "TEST-04" -Section "Contact Form" -SRSRef "FR-18" `
    -Description "Invalid email format rejected" `
    -CurlArgs @("-s", "-X", "POST", "$BASE_URL/contact",
                "-F", "full_name=Buhle",
                "-F", "email=notanemail",
                "-F", "subject=Test",
                "-F", "message=Hello") `
    -ExpectedFragment "valid email"

# Pass condition inside Run-Test (excerpt):
$passed = $bodyStr -match [regex]::Escape($ExpectedFragment)
