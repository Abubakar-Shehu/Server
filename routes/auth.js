const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabase');

router.get('/', (req,res) => {
  res.send("Welcome to the auth routes");
});

// Sign up endpoint
router.post('/signup', async(req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        error: 'Email, password, and username are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        error: 'Username must be at least 3 characters long'
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username
        }
      }
    });

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.json({
      message: 'Account created successfully! Please check your email for verification.',
      user: data.user
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Sign in endpoint
router.post('/signin', async(req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Check if it's a "user not found" error
      if (error.message.includes('Invalid login credentials') ||
          error.message.includes('User not found') ||
          error.message.includes('Email not confirmed')) {
        return res.status(404).json({
          error: 'Account not found. Please sign up to create a new account.',
          shouldRedirectToSignup: true
        });
      }
      
      return res.status(400).json({
        error: error.message
      });
    }

    res.json({
      message: 'Sign in successful',
      user: data.user,
      session: data.session
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Sign out endpoint
router.post('/signout', async(req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.json({
      message: 'Sign out successful'
    });

  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Get current user endpoint
router.get('/user', async(req, res) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return res.status(401).json({
        error: error.message
      });
    }

    res.json({
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;
