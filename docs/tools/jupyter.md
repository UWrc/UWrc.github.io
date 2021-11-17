---
id: jupyter
title: Jupyter Notebooks
---

Installing and Configuring Jupyter Notebook for Hyak.Klone
----------------------------------------------------------

Note: These instructions cover jupyter-notebook 6.4.5, though should be easily adaptable for both newer versions and jupyter-lab.

Before beginnning this work, please select a random number between 4096 and 16384 for your Jupyter-Notebook server to start on. It is important that this number is unique and does not conflict with either another user or an existing service on your machine. From this point out, we will use 9195 as an example.


1. Install Jupyter Notebook
    1. Miniconda (using a conda environment
        ```bash
        conda create -n jupyter-notebook
        conda activate jupyter-notebook
        conda install -c conda-forge notebook
        ```
    2. Pip (using a virtualenv)
        ```bash
            python3 -m venv ~/venvs/jupyter-notebook
            source ~/venvs/jupyter-notebook/bin/activate
            pip3 install notebook
        ```
2. Open a job allocation with the desired specs for use by Jupyter.
    ```bash
    ryanmcgr@klone1: salloc -A uwit -p compute --time=4:00:00 --mem=10G -c 4
        salloc: Pending job allocation 1546486
        salloc: job 1546486 queued and waiting for resources
        salloc: job 1546486 has been allocated resources
        salloc: Granted job allocation 1546486
        salloc: Waiting for resource configuration
        salloc: Nodes n3097 are ready for job
    ryanmcgr@n3097:
    ```
3. Activate the environment containing jupyter-notebook using the method stated above.
    ```bash
    ryanmcgr@n3097: source ~/venvs/jupyter-notebook/bin/activate
    (jupyter-notebook) ryanmcgr@n3097:
    ```
4. (Optional) Configure a setting file for Jupyter-Notebook, to more permanently set options such as ip, port, and password.
    ```bash
    (jupyter-notebook) ryanmcgr@n3097: jupyter-notebook --generate-config
    (jupyter-notebook) ryanmcgr@n3097: jupyter-notebook password
        Enter password:
        Verify password:
        [NotebookPasswordApp] Wrote hashed password to ~/.jupyter/jupyter_notebook_config.json
    (jupyter-notebook) ryanmcgr@n3097: vim ~/.jupyter/jupyter_notebook_config.py
    ```
    ~/.jupyter/jupyter_notebook_config.py
    ```
    ####CHANGED SETTINGS####
    ## The port the notebook server will listen on (env: JUPYTER_PORT).
    c.NotebookApp.port = 9195
    ## The IP address the notebook server will listen on.
    c.NotebookApp.ip = '0.0.0.0'
    ```
5. Start the Jupyter-Notebook server. Note that if a configuration was created above, the port and ip are not required as part of the command line.
    ```bash
    (jupyter-notebook) ryanmcgr@n3097: jupyter-notebook --port 9195 --ip 0.0.0.0
        [I 18:00:06.106 NotebookApp] Serving notebooks from local directory: /mmfs1/home/ryanmcgr
        [I 18:00:06.106 NotebookApp] Jupyter Notebook 6.4.5 is running at:
        [I 18:00:06.106 NotebookApp] http://n3097.hyak.local:9195/
        [I 18:00:06.106 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
        [W 18:00:06.135 NotebookApp] No web browser found: could not locate runnable browser.
    ```
6. Using the address provided in the response, open another SSH session, this time including the address and port as a local single-port forward. More can be found here: [Configuring SSH Single-Port Forwarding](/docs/setup/portforwarding)
7. If properly configured, the server should be accessible by opening your browser and navigating to http://localhost:9195.

