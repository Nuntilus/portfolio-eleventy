# Portfolio
## Run the project
``` bash
npm run serve
```

## Run with Docker
``` bash
docker compose up --build
```

## Setup systemd service
```bash
# Copy the service
cp systemd.service /etc/systemd/system/portfolio.service
# Enable the service
sudo systemctl enable portfolio.service --now
``` 


