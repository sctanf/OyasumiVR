import { Component, DestroyRef, Input, OnChanges, OnInit } from '@angular/core';
import { EventLogEntry } from '../../models/event-log-entry';
import { EventLogEntryParser } from './event-log-entry-parser';
import { EventLogSleepModeEnabledEntryParser } from './entry-parsers/sleep-mode-enabled';
import { EventLogSleepModeDisabledEntryParser } from './entry-parsers/sleep-mode-disabled';
import { EventLogTurnedOffOpenVRDevicesEntryParser } from './entry-parsers/openvr-device-turned-off';
import { EventLogGpuPowerLimitChangedEntryParser } from './entry-parsers/gpu-power-limit-changed';
import { EventLogAcceptedInviteRequestEntryParser } from './entry-parsers/accepted-invite-request';
import { EventLogStatusChangedOnPlayerCountChangeEntryParser } from './entry-parsers/status-changed-on-player-count-change';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { EventLogSleepDetectorEnableCancelledEntryParser } from './entry-parsers/sleep-detector-enable-cancelled';
import { EventLogRenderResolutionChangedEntryParser } from './entry-parsers/render-resolution-changed';
import { EventLogFadeDistanceChangedEntryParser } from './entry-parsers/fade-distance-changed';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventLogLighthouseSetPowerStateEntryParser } from './entry-parsers/lighthouse-set-power-state';
import { EventLogShutdownSequenceStartedEntryParser } from './entry-parsers/shutdown-sequence-started';
import { EventLogShutdownSequenceCancelledEntryParser } from './entry-parsers/shutdown-sequence-cancelled';
import { EventLogDisplayBrightnessChangedEntryParser } from './entry-parsers/display-brightness-changed';
import { EventLogImageBrightnessChangedEntryParser } from './entry-parsers/image-brightness-changed';

const parsers: EventLogEntryParser<EventLogEntry>[] = [
  new EventLogSleepModeEnabledEntryParser(),
  new EventLogSleepModeDisabledEntryParser(),
  new EventLogTurnedOffOpenVRDevicesEntryParser(),
  new EventLogLighthouseSetPowerStateEntryParser(),
  new EventLogGpuPowerLimitChangedEntryParser(),
  new EventLogDisplayBrightnessChangedEntryParser(),
  new EventLogImageBrightnessChangedEntryParser(),
  new EventLogAcceptedInviteRequestEntryParser(),
  new EventLogStatusChangedOnPlayerCountChangeEntryParser(),
  new EventLogSleepDetectorEnableCancelledEntryParser(),
  new EventLogRenderResolutionChangedEntryParser(),
  new EventLogFadeDistanceChangedEntryParser(),
  new EventLogShutdownSequenceStartedEntryParser(),
  new EventLogShutdownSequenceCancelledEntryParser(),
];

@Component({
  selector: 'app-event-log-entry',
  templateUrl: './event-log-entry.component.html',
  styleUrls: ['./event-log-entry.component.scss'],
})
export class EventLogEntryComponent implements OnInit, OnChanges {
  parser?: EventLogEntryParser<any>;
  headerInfoTitle?: SafeHtml;
  headerInfoSubTitle?: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private destroyRef: DestroyRef
  ) {}

  _entry?: EventLogEntry;
  @Input() set entry(entry: EventLogEntry | undefined) {
    this._entry = entry;
    this.rebuild();
  }

  get entry(): EventLogEntry | undefined {
    return this._entry;
  }

  ngOnInit() {
    this.ngOnChanges();
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.rebuild());
  }

  ngOnChanges() {
    this.parser = parsers.find((parser) => parser.entryType() === this.entry?.type);
    this.rebuild();
  }

  rebuild() {
    if (!this.parser) return;
    let key = this.parser.headerInfoTitle(this._entry);
    if (key) {
      this.headerInfoTitle = this.sanitizer.bypassSecurityTrustHtml(
        this.translate.instant(key, this.parser?.headerInfoTitleParams(this._entry) ?? {})
      );
    }
    key = this.parser.headerInfoSubTitle(this._entry);
    if (key) {
      this.headerInfoSubTitle = this.sanitizer.bypassSecurityTrustHtml(
        this.translate.instant(key, this.parser?.headerInfoSubTitleParams(this._entry) ?? {})
      );
    }
  }
}