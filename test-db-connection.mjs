#!/usr/bin/env node
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
    console.log('🔍 Testing MongoDB connection...');
    console.log('Environment:', process.env.NODE_ENV || 'development');
    
    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI environment variable is not set');
        console.error('💡 Make sure you have MONGODB_URI in your .env file');
        process.exit(1);
    }
    
    console.log('🔗 Connecting to MongoDB...');
    
    try {
        // Connect to MongoDB
        const connection = await mongoose.connect(MONGODB_URI, { 
            bufferCommands: false 
        });
        
        if (connection) {
            console.log('✅ MongoDB connection successful!');
            console.log('📊 Connection details:');
            // console.log(`  - Host: ${connection.connection.host}`);
            // console.log(`  - Database: ${connection.connection.name}`);
            // console.log(`  - Port: ${connection.connection.port}`);
            // console.log(`  - Ready State: ${connection.connection.readyState}`);
            
            // Test a simple operation
            const collections = await connection.connection.db?.listCollections().toArray();
            console.log(`  - Collections count: ${collections?.length || 0}`);
            
            if (collections && collections.length > 0) {
                console.log('  - Existing collections:', collections.map(c => c.name).join(', '));
            }
            
            // Close the connection
            await mongoose.disconnect();
            console.log('🔌 Connection closed successfully');
        }
        
        console.log('🎉 Connection test completed successfully!');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error:', error);
        
        if (error instanceof Error) {
            console.error('Message:', error.message);
            
            // Provide helpful error messages
            if (error.message.includes('MONGODB_URI')) {
                console.error('💡 Make sure MONGODB_URI is set in your .env file');
            } else if (error.message.includes('authentication')) {
                console.error('💡 Check your MongoDB credentials');
            } else if (error.message.includes('network')) {
                console.error('💡 Check your internet connection and MongoDB cluster');
            } else if (error.message.includes('timeout')) {
                console.error('💡 MongoDB cluster might be paused or unreachable');
            }
        }
        
        process.exit(1);
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
    process.exit(1);
});

// Run the test
testConnection();