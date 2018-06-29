# Immigrant Family Reunification Project

<img src="docs/app.png" width="750">
Image source: https://www.hpjc.org/event/houston-rapid-response-network-training/

## Deploy

> You should already have an IBM Blockchain Platform service provisioned in your IBM Cloud dashboard to use this sample.

1. Click the link below to automate the provision of a service on IBM Cloud and to deploy the contract and app contained in this repository.

[![Deploy to IBM Cloud](https://bluemix.net/deploy/button.png)](https://console.bluemix.net/devops/setup/deploy/?repository=https%3A//github.com/accordproject/ifrp&branch=master&env_id=ibm%3Ayp%3Aus-south&deploy-region=ibm%3Ayp%3Aus-south)

2. Authorize IBM Cloud to access your GitHub account. This sample will be forked into your account so you can modify it.

3. In the `Delivery Pipeline` tab under `Tool Integrations`. Enter the service name of your Blockchain instance from your IBM Cloud dashboard, it will be something like `Blockchain-xy`.

4. Click `Create` to trigger the deployment, then click 'Delivery Pipeline' to monitor to progress. 

5. Wait for both the 'Build' and 'Deploy' stages to pass, this should take about 10 minutes. While you are waiting you can get started with [setting up your Smart Legal Contract on Clause](https://clause.elevio.help/en/articles/48).

6. Click the Client App link under 'LAST EXECUTION RESULT' to view your demonstration app, it should look like the screenshot at the top of this page.

<img src="docs/pipeline.png" width="750">

&copy; Copyright 2018, Clause Inc. 
