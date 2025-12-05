#!/bin/bash
set -e
for f in *.hurl; do
  echo "Running $f"
  hurl "$f"
done
