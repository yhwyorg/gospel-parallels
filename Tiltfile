###############################################################################
# LOAD TILT EXTENSIONS (only non-built-in functions)
###############################################################################

load("ext://helm_remote", "helm_remote")
load("ext://namespace", "namespace_yaml")
load("ext://cert_manager", "deploy_cert_manager")
load("ext://git_resource", "git_resource")

###############################################################################
# HELPER FUNCTIONS
###############################################################################


# Detect OS Type
def get_os_type():
    windows_check = str(local("echo %OS%", quiet=True)).strip().lower()
    if "windows" in windows_check:
        return "windows"
    
    # If not Windows, assume Linux/macOS
    uname_result = str(local("uname", quiet=True)).strip().lower()
    if "darwin" in uname_result:
        return "macos"
    elif "linux" in uname_result:
        return "linux"
    
    return "unknown"

# Create certificates using a local PowerShell script
def certificate_creation(service_name):
    build_context = "./certificates"
    service_name_lower = service_name.lower()
    os_type = get_os_type()

    if os_type == "windows":
        command = "cd {} && powershell.exe -File ./generate-certs.ps1".format(build_context)
    elif os_type == "macos":
        command = "cd {} && sudo pwsh -File ./generate-certs.ps1".format(build_context)
    else:  # Assume Linux
        command = "cd {} && pwsh -File ./generate-certs.ps1".format(build_context)

    local_resource(
        "{}-certificate-creation".format(service_name_lower),
        command,
        labels=["Local-Certificates"],
    )

    local_resource(
        "{}-edge-certificate-install".format(service_name_lower),
        "cd {} && kubectl delete secret wildcard-tls-dev --ignore-not-found -n traefik && kubectl create secret tls wildcard-tls-dev -n traefik --key ./intermediateCA/private/localhost.key.pem --cert ./intermediateCA/certs/localhost-chain.cert.pem".format(build_context),
        deps=["{}-certificate-creation".format(service_name_lower), "k8s_namespace"],
        labels=["Local-Certificates"]
    )

# Create a Kubernetes namespace using a YAML snippet from the namespace extension
def k8s_namespace(namespace_name, allow_duplicates=False):
    k8s_yaml(
        namespace_yaml(namespace_name),
        allow_duplicates=allow_duplicates,
    )

# Deploy a remote Helm chart from a given repository URL
def remote_helm(service_name, repo_url, namespace, release_name, values):
    helm_remote(
        repo_name=service_name,
        repo_url=repo_url,
        values=values,  # a string or a list of values files
        namespace=namespace,
        release_name=release_name,
        chart=service_name,
    )

# Deploy a React application using a Dockerfile
def deploy_react_app(
    service_name,
    build_context=".",
    dockerfile="Dockerfile",
    host_port=3000,
    container_port=80,
    namespace="default",
    resources={},
    use_https=False
):
    service_name_lower = service_name.lower()
    
    # Create dockerfile if it doesn't exist
    dockerfile_path = "{}/{}".format(build_context, dockerfile)
    if not os.path.exists(dockerfile_path):
        local("echo 'FROM node:18-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=build /app/dist /usr/share/nginx/html\nCOPY nginx.conf /etc/nginx/conf.d/default.conf\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]' > {}".format(dockerfile_path))
        local("echo 'server {\n  listen 80;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n    try_files $uri $uri/ /index.html;\n  }\n}' > {}/nginx.conf".format(build_context))
    
    # Build the Docker image
    docker_build(
        service_name_lower,
        context=build_context,
        dockerfile=dockerfile
    )
    
    # Create Kubernetes YAML for the deployment and service
    yaml_str = """
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {0}
  namespace: {1}
  labels:
    app: {0}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: {0}
  template:
    metadata:
      labels:
        app: {0}
    spec:
      containers:
      - name: {0}
        image: {0}
        ports:
        - containerPort: {2}
        resources:
          requests:
            cpu: {3}
            memory: {4}
          limits:
            cpu: {5}
            memory: {6}
---
apiVersion: v1
kind: Service
metadata:
  name: {0}
  namespace: {1}
  labels:
    app: {0}
spec:
  ports:
  - port: {2}
    targetPort: {2}
    protocol: TCP
  selector:
    app: {0}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {0}
  namespace: {1}
  annotations:
    kubernetes.io/ingress.class: traefik
    traefik.ingress.kubernetes.io/router.entrypoints: {7}
spec:
  rules:
  - host: "{0}.localhost"
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: {0}
            port:
              number: {2}
  tls:
  - hosts:
    - "{0}.localhost"
    secretName: wildcard-tls-dev
""".format(
    service_name_lower, 
    namespace, 
    container_port,
    resources.get("request_cpu", "100m"),
    resources.get("request_memory", "128Mi"),
    resources.get("limit_cpu", "500m"),
    resources.get("limit_memory", "512Mi"),
    "websecure" if use_https else "web"
)
    
    # Apply the Kubernetes YAML
    k8s_yaml(blob(yaml_str))
    
    # Create a resource mapping for this service
    k8s_resource(
        service_name_lower,
        port_forwards=["{}:{}".format(host_port, container_port)],
        labels=["jesus-chronology-app"]
    )
    
    # Return the URL for the deployed application
    protocol = "https" if use_https else "http"
    app_url = "{}://{}.localhost".format(protocol, service_name_lower)
    print("{} is available at: {}".format(service_name, app_url))
    
    # Create a local resource for the URL
    local_resource(
        "{}-url".format(service_name_lower),
        cmd="echo Service available at {}".format(app_url),
        links=[app_url],
        labels=["jesus-chronology-app"]
    )
    
    return service_name_lower

###############################################################################
# DEPLOYMENT CONFIGURATION
###############################################################################
# Create Kubernetes namespaces
k8s_namespace("traefik")
k8s_namespace("jesus-chronology")

# Create certificates via a local script
certificate_creation("dev")

# Deploy Traefik ingress controller
remote_helm(
    service_name="traefik",
    repo_url="https://helm.traefik.io/traefik",
    values="./helm/traefik.yaml",
    namespace="traefik",
    release_name="traefik",
)

# Deploy Jesus Chronology Comparison application
deploy_react_app(
    service_name="jesus-chronology",
    build_context=".",
    host_port=3000,
    container_port=80,
    namespace="jesus-chronology",
    resources={
        "request_cpu": "100m",
        "request_memory": "256Mi",
        "limit_cpu": "500m",
        "limit_memory": "512Mi"
    },
    use_https=True
)