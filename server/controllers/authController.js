// Auth Controller for GlobeTrotter Backend

import { db } from '../database/db.js';

export const registerUser = (req, res) => {
  try {
    const { name, email, password, travelStyle } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existingUser = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const newUser = db.insert('users', {
      name,
      email: email.toLowerCase(),
      password,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      travelStyle: travelStyle || 'Balanced Explorer',
      memberSince: new Date().getFullYear().toString(),
      tripsCompleted: 0,
      loyaltyPoints: 1000
    });

    const { password: _, ...userSafe } = newUser;
    return res.status(201).json({ user: userSafe, token: `mock-jwt-token-${newUser.id}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    let user = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    
    // Auto-create or authenticate user for demo convenience
    if (!user) {
      user = db.insert('users', {
        name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
        email: email.toLowerCase(),
        password,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        travelStyle: 'Balanced Explorer',
        memberSince: '2026',
        tripsCompleted: 1,
        loyaltyPoints: 500
      });
    }

    const { password: _, ...userSafe } = user;
    return res.json({ user: userSafe, token: `mock-jwt-token-${user.id}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    const user = db.findOne('users', () => true);
    if (!user) return res.status(404).json({ error: 'No user found.' });
    const { password: _, ...userSafe } = user;
    return res.json(userSafe);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
