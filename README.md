<p align="center">
    <img src="https://github.com/Raphiiko/Oyasumi/blob/develop/docs/img/logo_light.png?raw=true#gh-light-mode-only" width="350">
    <img src="https://github.com/Raphiiko/Oyasumi/blob/develop/docs/img/logo_dark.png?raw=true#gh-dark-mode-only" width="350">
    <br/>
    <br/>
    A collection of utilities to assist with sleeping in virtual reality
</p>
<p align="center">
    <a><img alt="Latest Version" src="https://img.shields.io/github/v/tag/Raphiiko/Oyasumi?color=informational&label=version&sort=semver"></a>
    <a><img alt="Production Build Status" src="https://github.com/Raphiiko/Oyasumi/actions/workflows/build-release.yml/badge.svg"/></a>
    <a><img alt="Development Build Status" src="https://github.com/Raphiiko/Oyasumi/actions/workflows/build-development.yml/badge.svg"/></a>
    <a href="https://github.com/Raphiiko/Oyasumi/blob/develop/LICENSE"><img alt="License" src="https://img.shields.io/github/license/Raphiiko/Oyasumi"></a>
</p>

<p align="center">
    <img src="https://github.com/Raphiiko/Oyasumi/blob/develop/docs/img/screenshot1.png?raw=true" width="600">
</p>

This is the main repository for Oyasumi. It is an open source tool to assist with sleeping in virtual reality.

**Note:** Currently, Oyasumi is in its very early stages. The current functionality is likely to still contain several bugs and issues.

## Getting started

Grab the latest installer over on the [Releases](https://github.com/Raphiiko/Oyasumi/releases) page.

## Features

- :wrench: Turning off all trackers and/or controllers with a single click.
- :zzz: Manage your sleep state in various ways with automations:
  - Fall asleep:
    - When a controller or tracker battery percentage falls below a threshold
    - When turning off your controllers
    - On a time schedule
  - Wake up:
    - When turning on a controller or tracker
    - On a time schedule
- :battery: Battery automations:
  - Automatically turn off trackers and/or controllers:
    - When you go to sleep
    - When putting them on the charger
- :electric_plug: GPU Automations:
  - Automatically tweak your power limits when you go to sleep and when you wake up.
- 🗺️ Multi language support
  - English
  - Dutch

If you would like to help out with adding more languages and/or missing translations, please check out [the wiki page on adding translations](https://github.com/Raphiiko/Oyasumi/wiki/Adding-Translations) for instructions on how to get started!

Here is an example use case of these features combined:
> I go to sleep in full body tracking. When one of my trackers reaches 50% battery, Oyasumi enables sleep mode. Because sleep mode is enabled, all my controllers and trackers are turned off and power limits are set for my graphics card to reduce the power usage. When I wake up, I turn on my controllers, so Oyasumi disables sleep mode. This restores the default power limits for my video card, giving me full performance again. My trackers and controllers still have plenty of the battery left to continue playing!

### Built With

Oyasumi has been built with [Angular](https://angular.io/) and [Tauri](https://tauri.app/).

## Supported Devices

### Battery Automations
Currently Oyasumi supports battery automations for all SteamVR devices that:
1. Support reporting for battery levels and charging status
2. Support being turned off via SteamVR. 

This includes, but is not limited to the following devices:
- HTC Vive Controllers/Wands
- Index Controllers/Knuckles
- Vive Trackers (1.0/2.0/3.0)
- Tundra Trackers\*

This means that any Oculus controller is unlikely to work, and SlimeVR trackers are unsupported unless they implement this functionality in their [OpenVR driver](https://github.com/SlimeVR/SlimeVR-OpenVR-Driver).

*(\*) Tundra trackers have very delayed reporting of battery levels and charging status. This means that while automations will still work, they will be very delayed (minutes in the double digits), unless Tundra fixes this in their tracker firmware. (https://forum.tundra-labs.com/t/firmware-issues/746)*

### GPU Automations

Currently, only NVIDIA cards are supported for setting power limits. AMD and Intel cards are not yet supported.

For AMD support, please see the following [issue](https://github.com/Raphiiko/Oyasumi/issues/7).

## Development

To start development on Oyasumi, start by following Tauri's [prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) (Installing Rust).
Make sure to grab the nightly, as Oyasumi uses some functionality that is not yet available in the current stable release of Rust.

After you have followed the guide and installed Rust, install [NodeJS](https://nodejs.org/en/download/).

It could be helpful to install the [Angular CLI](https://angular.io/cli) globally.

Once you have set up these dependencies, you can continue as follows:

1. Check out Oyasumi on your machine.
2. Run `npm run install` or `yarn`, depending on whether you prefer using `npm` or `yarn`.
3. Run `npm run build` or `yarn build` at least once.

From here, you can run `npm run tauri dev` or `yarn tauri dev` to run the application locally.

## License

Oyasumi is available under the [MIT](https://github.com/Raphiiko/Oyasumi/blob/develop/LICENSE.md) license.
