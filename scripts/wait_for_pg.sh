#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

until psql -h "$host" -U "postgres" -c '\q'; do
  >&2 echo "Postgres is down, sleeping..."
  sleep 1
done

>&2 echo "Postgres is :rocket:"
exec $cmd
