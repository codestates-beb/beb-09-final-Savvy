import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function ErrorPage() {
    
    const preventCopy = (e) => {
        e.preventDefault();
        return false;
    }

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "80vh",
            userSelect: "none"  
        }}
        onCopy={preventCopy}   
        onDragStart={preventCopy}  
        >
            <img src="/404.png" alt="404 Error" style={{ width: "100%", maxWidth: "600px", marginBottom: "-20px" }} />
            <h1 style={{ 
                fontFamily: "'tektur', sans-serif", 
                fontSize: "2.8rem", 
                fontWeight: "700", 
                marginTop: "-100px" 
            }}>
                Oops! Page Not Found
            </h1>
            <p style={{ fontSize: "1rem", marginTop: "-20px", marginBottom: "45px" }}>
                Make sure you entered the page URL correctly.
            </p>
            <Button 
                component={Link} 
                to="/" 
                variant="contained"
                sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", 
                      backgroundColor: "#576ff6", 
                      '&:hover': 
                      { backgroundColor: "#3351e2" },
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      padding: "16px 28px", 
                      borderRadius: "10px",
                    }}
            >
                Back To Main Page
            </Button>
        </div>
    );
}

export default ErrorPage;