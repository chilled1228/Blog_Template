# MCP Configuration

## Overview
This document describes the MCP (Multi-Client Protocol) configuration for the Blog_Template project. MCP allows integration with various tools and services directly from the IDE.

## Configuration File
The MCP configuration is located at `.mcp/mcp.json` in the project root.

## Current Configuration

### Playwright
- **Purpose**: Browser automation and testing
- **Command**: `npx @playwright/mcp@latest`

### Firecrawl
- **Purpose**: Web scraping and content extraction
- **Command**: `npx -y firecrawl-mcp`
- **Environment**: 
  - `FIRECRAWL_API_KEY`: `fc-6e714e14c3e34de5bca816c5180ac849`

### Supabase
- **Purpose**: Database integration and management
- **Command**: `npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref=ypqxojzjbocbzdbhphok`
- **Environment**: 
  - `SUPABASE_ACCESS_TOKEN`: `sbp_c8264ba52143b6f0468a599acfe2f0254e9e0113`

## Supabase Integration

### Project Reference
- **Project Ref**: `ypqxojzjbocbzdbhphok`
- **Project URL**: `https://ypqxojzjbocbzdbhphok.supabase.co`

### Environment Variables
The following environment variables are used in the application:
- `NEXT_PUBLIC_SUPABASE_URL`: The Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for client-side operations

These are configured in the `.env.local` file.

## Usage

### Accessing MCP Tools
The MCP tools can be accessed directly from the IDE:
1. Playwright for browser automation
2. Firecrawl for web scraping
3. Supabase for database operations

### Supabase Operations
With the MCP Supabase integration, you can:
- Query database tables
- View table schemas
- Execute read-only operations
- Manage database structure

## Security Notes
- The configuration uses read-only mode for Supabase to prevent accidental data modification
- Sensitive tokens are stored in the MCP configuration file which should not be committed to version control
- The Supabase access token provides authenticated access to the database

## Troubleshooting
If you encounter issues with MCP tools:
1. Ensure the MCP configuration file is properly formatted
2. Verify that the access tokens are valid
3. Check network connectivity to the services
4. Confirm that the required dependencies are installed