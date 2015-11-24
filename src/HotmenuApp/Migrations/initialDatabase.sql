IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK_HistoryRow] PRIMARY KEY ([MigrationId])
    );

GO

CREATE TABLE [Administrator] (
    [Id] int NOT NULL IDENTITY,
    [Password] nvarchar(max) NOT NULL,
    [Username] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Administrator] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Category] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max),
    CONSTRAINT [PK_Category] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Foo] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max),
    CONSTRAINT [PK_Foo] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Order] (
    [Id] uniqueidentifier NOT NULL,
    [Note] nvarchar(max),
    [Status] nvarchar(max),
    [TableNo] int NOT NULL,
    [Time] datetime2 NOT NULL,
    [Total] decimal(18, 2) NOT NULL,
    CONSTRAINT [PK_Order] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [MenuItem] (
    [Id] int NOT NULL IDENTITY,
    [CategoryId] int NOT NULL,
    [Description] nvarchar(max),
    [Image] varbinary(max),
    [Name] nvarchar(max),
    [Price] decimal(18, 2) NOT NULL,
    CONSTRAINT [PK_MenuItem] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_MenuItem_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [OrderItem] (
    [Id] int NOT NULL IDENTITY,
    [ClientName] nvarchar(max),
    [MenuItemId] int NOT NULL,
    [MenuItemName] nvarchar(max),
    [OrderId] uniqueidentifier NOT NULL,
    [Price] decimal(18, 2) NOT NULL,
    CONSTRAINT [PK_OrderItem] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_OrderItem_Order_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Order] ([Id]) ON DELETE CASCADE
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20151124011614_InitialDatabase', N'7.0.0-rc1-16348');

GO

ALTER TABLE [MenuItem] DROP CONSTRAINT [FK_MenuItem_Category_CategoryId];

GO

ALTER TABLE [OrderItem] DROP CONSTRAINT [FK_OrderItem_Order_OrderId];

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Order') AND [c].[name] = N'Total');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Order] DROP CONSTRAINT [' + @var0 + ']');
ALTER TABLE [Order] DROP COLUMN [Total];

GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'OrderItem') AND [c].[name] = N'Id');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [OrderItem] DROP CONSTRAINT [' + @var1 + ']');
ALTER TABLE [OrderItem] ALTER COLUMN [Id] uniqueidentifier NOT NULL;

GO

ALTER TABLE [MenuItem] ADD CONSTRAINT [FK_MenuItem_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]) ON DELETE CASCADE;

GO

ALTER TABLE [OrderItem] ADD CONSTRAINT [FK_OrderItem_Order_OrderId] FOREIGN KEY ([OrderId]) REFERENCES [Order] ([Id]) ON DELETE CASCADE;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20151124025524_OrderItemIdColumn', N'7.0.0-rc1-16348');

GO

