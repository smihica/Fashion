#!/usr/bin/python -S
import cgi
import sys
import re
import glob

import cgitb
cgitb.enable(display=1, logdir="/tmp")

included_files = set([])

def compose_source(root, op, route):
    with file(root, 'r') as f:
        op.write('\n\n/************** '+root+' **************/\n')
        for line in f:
            includes = re.findall(r'include\(\"(.+?)\"\)', line)
            if not includes:
                op.write(line)
            else:
                for file_name_a in includes:
                    file_name_b = re.findall(r'^(.+/)*(.*)$', file_name_a)
                    next_route = route + file_name_b[0][0]
                    file_name_c = file_name_b[0][1]
                    for file_name in glob.glob(next_route + file_name_c):
                        if not file_name in included_files:
                            included_files.add(file_name)
                            compose_source(file_name, op, next_route)

def main():
    argvs = set(sys.argv)
    param = cgi.FieldStorage()
    root = param.getfirst("file", "main.js")

    if not '-c' in argvs:
        sys.stdout.write('content-type: application/x-javascript; charset=UTF-8\r\n')
        sys.stdout.write('\r\n')

    file_name_b = re.findall(r'^(.+/)*(.*)$', root)
    route = file_name_b[0][0]

    included_files.add(root)
    compose_source(root, sys.stdout, route)

main()

