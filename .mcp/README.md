# MCP Configuration

This directory contains the Multi-Client Protocol (MCP) configuration for integrating external tools with the IDE.

## Configuration File

- `mcp.json`: Contains the configuration for various MCP servers including:
  - Playwright for browser automation
  - Firecrawl for web scraping
  - Supabase for database operations

## Security

This configuration contains sensitive access tokens and should NOT be committed to version control. The directory is automatically ignored by the `.gitignore` file.

## Usage

The MCP tools can be accessed directly from the IDE to:
- Run browser automation tests with Playwright
- Scrape web content with Firecrawl
- Interact with the Supabase database

## Supabase Integration

The Supabase MCP integration is configured in read-only mode to prevent accidental data modification. It connects to the project with ref `ypqxojzjbocbzdbhphok`.

For more information about the MCP configuration, see the [MCP_CONFIGURATION.md](../MCP_CONFIGURATION.md) file in the project root.