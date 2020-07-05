#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["/WarwickWordCount/WarwickWordCount.csproj", "WarwickWordCount/"]
RUN dotnet restore "WarwickWordCount/WarwickWordCount.csproj"
COPY . .
WORKDIR "/src/WarwickWordCount"
RUN dotnet build "WarwickWordCount.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WarwickWordCount.csproj" -c Release -o /app/publish

FROM node:12.6.0 as frontendBuild
WORKDIR /src
COPY WarwickWordCount/ClientApp/word-count .
#WORKDIR "/src/WarwickWordCount/ClientApp/word-count/"
RUN npm install

FROM frontendBuild as frontendPublish
RUN npm run-script build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=frontendPublish src/build ./public/
ENTRYPOINT ["dotnet", "WarwickWordCount.dll"]