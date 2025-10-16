#!/bin/bash
NODE=$(ssh klone-login 'squeue \
    --user $USER \
    --states RUNNING \
    --name klone-container \
    --Format NodeList \
    --noheader ')
sed -I '' -E s"/Hostname.*/Hostname $NODE/" ~/.ssh/klone-node-config
