#!/bin/bash
NODE=$(ssh klone 'squeue \
    --user $USER \
    --states RUNNING \
    --name vsc-proxy-jump \
    --Format NodeList \
    --noheader ')
sed -I '' -E s"/Hostname.*/Hostname $NODE/" ~/.ssh/klone-node-config
