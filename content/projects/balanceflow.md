---
title: BalanceFlow
summary: Real-time ledger and compliance system with GAAP-conformant balance sheets.
featured: true
order: 1
color: "#8b5cf6"
# No screenshot yet: add public/media/projects/balanceflow.webp and uncomment these lines.
# cover:
#   src: /media/projects/balanceflow.webp
#   alt: BalanceFlow dashboard
stack: [Next.js, C# / ASP.NET Core, TypeScript, Supabase, Tailwind CSS, Framer Motion]
links:
  live: https://balance-flow-theta.vercel.app/login
  repo: https://github.com/GRONK13/BalanceFlow
# DRAFT: fill these in (they show on the case-study page when set).
# year: "2026"
# role: Full-stack developer
# team: Solo project
---

<!-- DRAFT case study written by Claude from the project description. Replace with your own story: the problem, what you built, and what happened. -->

## Overview

BalanceFlow is a real-time ledger and compliance system built with modern engineering practices. It computes dynamic balance sheets that follow GAAP accounting principles.

## What it does

- Builds balance sheets on the fly from the underlying ledger entries
- Audits double-entry records and flags balance discrepancies
- Simulates smart OCR in an automated document-ingestion workflow that classifies invoices to accounts

## Under the hood

A Next.js and TypeScript front end talks to a C# ASP.NET Core API, with Supabase for data and Framer Motion for interface motion.
