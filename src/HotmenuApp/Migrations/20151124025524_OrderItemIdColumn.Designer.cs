using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using HotmenuApp.Models;

namespace HotmenuApp.Migrations
{
    [DbContext(typeof(HotmenuDbContext))]
    [Migration("20151124025524_OrderItemIdColumn")]
    partial class OrderItemIdColumn
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HotmenuApp.Models.Administrator", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Username")
                        .IsRequired();

                    b.HasKey("Id");
                });

            modelBuilder.Entity("HotmenuApp.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("HotmenuApp.Models.Foo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("HotmenuApp.Models.MenuItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<string>("Description");

                    b.Property<byte[]>("Image");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("HotmenuApp.Models.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Note");

                    b.Property<string>("Status");

                    b.Property<int>("TableNo");

                    b.Property<DateTime>("Time");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("HotmenuApp.Models.OrderItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClientName");

                    b.Property<int>("MenuItemId");

                    b.Property<string>("MenuItemName");

                    b.Property<Guid>("OrderId");

                    b.Property<decimal>("Price");

                    b.HasKey("Id");
                });

            modelBuilder.Entity("HotmenuApp.Models.MenuItem", b =>
                {
                    b.HasOne("HotmenuApp.Models.Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("HotmenuApp.Models.OrderItem", b =>
                {
                    b.HasOne("HotmenuApp.Models.Order")
                        .WithMany()
                        .HasForeignKey("OrderId");
                });
        }
    }
}
