# /migrate — Database Migration Workflow

Use this command to create, review, or run database migrations safely.

## Creating a New Migration

When asked to create migration NNN for a feature:

1. **Name it correctly:**
   ```
   database/migrations/NNN_description.up.sql
   database/migrations/NNN_description.down.sql
   ```

2. **UP migration template:**
   ```sql
   -- NNN_description.up.sql
   -- REQ-YYYYMM-NNN: [Requirement this migration supports]
   -- D-NNN: [Decision that informed this schema]

   -- Create tables
   CREATE TABLE IF NOT EXISTS table_name (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
     -- columns...
   );

   -- Enable RLS (REQUIRED on every table)
   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

   -- RLS policies
   CREATE POLICY "public_read" ON table_name
     FOR SELECT USING (true);

   CREATE POLICY "admin_write" ON table_name
     FOR ALL USING (
       EXISTS (
         SELECT 1 FROM user_profiles
         WHERE id = auth.uid() AND role = 'admin'
       )
     );

   -- Indexes
   CREATE INDEX IF NOT EXISTS idx_table_name_column ON table_name(column);
   ```

3. **DOWN migration template:**
   ```sql
   -- NNN_description.down.sql
   -- Reverses NNN_description.up.sql

   DROP TABLE IF EXISTS table_name CASCADE;
   ```

## Migration Safety Checklist

Before applying any migration, verify:
- [ ] UP migration has a paired DOWN migration
- [ ] DOWN migration cleanly reverses UP (test it!)
- [ ] RLS policy is included in the migration (not added ad-hoc)
- [ ] All foreign keys have indexes
- [ ] Migration does NOT drop columns without explicit user confirmation
- [ ] Migration is idempotent (CREATE TABLE IF NOT EXISTS, not just CREATE TABLE)

## Applying Migrations (Supabase)

Use Supabase MCP tools or SQL editor:
```
mcp__claude_ai_Supabase__apply_migration
```

Or via Supabase dashboard → SQL Editor → paste migration.

## Report Format

```
SPTS MIGRATION: NNN_description
═══════════════════════════════════════
📄 UP file: database/migrations/NNN_description.up.sql ✅
📄 DOWN file: database/migrations/NNN_description.down.sql ✅
🔒 RLS policies: [list tables with policies]
📊 Tables created: [list]
📊 Tables modified: [list]
⚠️ Regression risk: [LOW/MEDIUM/HIGH]
🔄 Rollback: Run DOWN migration in Supabase SQL editor
═══════════════════════════════════════
```
