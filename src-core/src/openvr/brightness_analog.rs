use std::ffi::CStr;

use super::devices::get_devices;
use super::models::TrackedDeviceClass;
use super::OVR_CONTEXT;
use ovr_overlay as ovr;

use hidapi::HidApi;

static mut GAIN: i16 = -1;

pub async fn get_analog_gain() -> Result<f32, String> {
    unsafe {
        let analog_gain = GAIN as f32;
        Ok(analog_gain)
    }
}

pub async fn set_analog_gain(analog_gain: f32) -> Result<(), String> {
    unsafe {
        let a = (analog_gain as i16).clamp(0, 1023);
        if GAIN != a {
            GAIN = a;
            let api = HidApi::new().unwrap();
            let dev = api.open(0x35bd, 0x0101).unwrap();
            dev.send_feature_report(&[0, 0x49, (a/256) as u8, a as u8]).unwrap();
        }
        Ok(())
    }
}
