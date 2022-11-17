#!/bin/bash
# First, get the connection information off of the klone login node:
JUPYTER_INFO=$(ssh klone-node 'cat ~/.jupyter-port-and-token' 2>/dev/null)

# If we didn't receive anything, print an error message and exit:
if [[ -z $JUPYTER_INFO ]]; then
    echo "Error: Couldn't retreive Jupyter server port/token"
    exit 1
fi

# Some fancy Bash to split the port and the token:
JUPYTER_PORT=${JUPYTER_INFO% *}
JUPYTER_TOKEN=${JUPYTER_INFO#* }

# Start the port-forwarding and save the SSH process ID:
ssh -NL 8888:localhost:$JUPYTER_PORT klone-node &
SSH_PID=$!

# If the SSH process ended with an error, print an error message and exit:
if (( $? != 0 )); then
    echo "Error: Port forwarding failed."
    exit 1
fi

# Finally, print out the connection information:
echo
echo "Connect to:"
echo "  http://localhost:8888/?token=$JUPYTER_TOKEN"
echo "Close tunnel with: "
echo "  kill $SSH_PID"
echo
