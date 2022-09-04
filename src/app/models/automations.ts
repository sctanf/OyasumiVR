import { OVRDeviceClass } from './ovr-device';

export type AutomationType =
  // SLEEP MODE AUTOMATIONS
  | 'SLEEP_MODE_ENABLE_AT_TIME'
  | 'SLEEP_MODE_ENABLE_AT_BATTERY_PERCENTAGE'
  | 'SLEEP_MODE_ENABLE_ON_CONTROLLERS_POWERED_OFF'
  | 'SLEEP_MODE_DISABLE_AT_TIME'
  | 'SLEEP_MODE_DISABLE_ON_DEVICE_POWER_ON'
  // BATTERY AUTOMATIONS
  | 'TURN_OFF_DEVICES_ON_SLEEP_MODE_ENABLE'
  | 'TURN_OFF_DEVICES_WHEN_CHARGING';

export interface AutomationConfigs {
  version: 2;
  // SLEEP MODE AUTOMATIONS
  SLEEP_MODE_ENABLE_AT_TIME: SleepModeEnableAtTimeAutomationConfig;
  SLEEP_MODE_ENABLE_AT_BATTERY_PERCENTAGE: SleepModeEnableAtBatteryPercentageAutomationConfig;
  SLEEP_MODE_ENABLE_ON_CONTROLLERS_POWERED_OFF: SleepModeEnableAtControllersPoweredOffAutomationConfig;
  SLEEP_MODE_DISABLE_AT_TIME: SleepModeDisableAtTimeAutomationConfig;
  SLEEP_MODE_DISABLE_ON_DEVICE_POWER_ON: SleepModeDisableOnDevicePowerOnAutomationConfig;
  TURN_OFF_DEVICES_ON_SLEEP_MODE_ENABLE: TurnOffDevicesOnSleepModeEnableAutomationConfig;
  TURN_OFF_DEVICES_WHEN_CHARGING: TurnOffDevicesWhenChargingAutomationConfig;
}

export interface AutomationConfig {
  enabled: boolean;
}

//
// Automation configs
//

// SLEEP MODE AUTOMATIONS
export interface SleepModeEnableAtTimeAutomationConfig extends AutomationConfig {
  time: string | null;
}

export interface SleepModeEnableAtBatteryPercentageAutomationConfig extends AutomationConfig {
  triggerClasses: OVRDeviceClass[];
  threshold: number;
}

export interface SleepModeEnableAtControllersPoweredOffAutomationConfig extends AutomationConfig {}

export interface SleepModeDisableAtTimeAutomationConfig extends AutomationConfig {
  time: string | null;
}

export interface SleepModeDisableOnDevicePowerOnAutomationConfig extends AutomationConfig {
  triggerClasses: OVRDeviceClass[];
}

// DEVICE BATTERY AUTOMATIONS
export interface TurnOffDevicesOnSleepModeEnableAutomationConfig extends AutomationConfig {
  deviceClasses: OVRDeviceClass[];
}

export interface TurnOffDevicesWhenChargingAutomationConfig extends AutomationConfig {
  deviceClasses: OVRDeviceClass[];
}

//
// DEFAULT
//

export const AUTOMATION_CONFIGS_DEFAULT: AutomationConfigs = {
  version: 2,
  // SLEEP MODE AUTOMATIONS
  SLEEP_MODE_ENABLE_AT_TIME: {
    enabled: false,
    time: null,
  },
  SLEEP_MODE_ENABLE_AT_BATTERY_PERCENTAGE: {
    enabled: false,
    triggerClasses: ['GenericTracker', 'Controller'],
    threshold: 50,
  },
  SLEEP_MODE_ENABLE_ON_CONTROLLERS_POWERED_OFF: {
    enabled: false,
  },
  SLEEP_MODE_DISABLE_AT_TIME: {
    enabled: false,
    time: null,
  },
  SLEEP_MODE_DISABLE_ON_DEVICE_POWER_ON: {
    enabled: false,
    triggerClasses: ['GenericTracker', 'Controller'],
  },
  TURN_OFF_DEVICES_ON_SLEEP_MODE_ENABLE: {
    enabled: true,
    deviceClasses: [],
  },
  TURN_OFF_DEVICES_WHEN_CHARGING: {
    enabled: true,
    deviceClasses: [],
  },
};