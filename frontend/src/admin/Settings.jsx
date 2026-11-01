
import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

const initialPincodes = [
  { id: 1, pincode: "641601", area: "Demo Area 1", fee: 30, enabled: true },
  { id: 2, pincode: "641602", area: "Demo Area 2", fee: 30, enabled: true },
  { id: 3, pincode: "641603", area: "Demo Area 3", fee: 50, enabled: true },
];

const initialZones = [
  {
    id: 1,
    name: "Standard Delivery",
    minDistance: 0,
    maxDistance: 5,
    fee: 30,
    enabled: true,
  },
  {
    id: 2,
    name: "Extended Delivery",
    minDistance: 5,
    maxDistance: 10,
    fee: 50,
    enabled: true,
  },
];

const inputClass =
  "mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#315C3B] focus:ring-2 focus:ring-[#315C3B]/10";

const labelClass = "block text-sm font-semibold text-stone-700";

const buttonPrimary =
  "rounded-full bg-[#315C3B] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#25482D]";

const buttonSecondary =
  "rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50";

function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#1F3827]">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-stone-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Toggle({ checked, onChange, title, description }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-4 accent-[#315C3B]"
      />
      <span>
        <span className="block text-sm font-semibold text-stone-800">
          {title}
        </span>
        {description && (
          <span className="mt-1 block text-sm text-stone-500">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

function Popup({ title, subtitle, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1F3827]">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup"
            className="rounded-full px-3 py-1 text-xl text-stone-500 hover:bg-stone-100"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const Settings = () => {
  const [store, setStore] = useState({
    name: "NalamNilam",
    email: "nalamnilam@gmail.com",
    phone: "",
    currency: "INR",
    address: "",
    storePincode: "",
    defaultFee: 30,
  });

  const [pincodes, setPincodes] = useState(initialPincodes);
  const [zones, setZones] = useState(initialZones);

  const [payments, setPayments] = useState({
    cod: true,
    online: false,
  });

  const [delivery, setDelivery] = useState({
    minimumOrder: 100,
    freeDeliveryThreshold: 500,
    estimatedDelivery: "Same day",
    extendedZoneEnabled: true,
    requireAddressPin: true,
    allowAddressMapPin: true,
  });

  const [orderSettings, setOrderSettings] = useState({
    allowCancellation: true,
    allowReviews: true,
    lowStockAlert: 10,
  });

  const [pinPopup, setPinPopup] = useState(false);
  const [editingPin, setEditingPin] = useState(null);
  const [deletePin, setDeletePin] = useState(null);
  const [pinForm, setPinForm] = useState({
    pincode: "",
    area: "",
    fee: 30,
    enabled: true,
  });

  const [zonePopup, setZonePopup] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [zoneForm, setZoneForm] = useState({
    name: "",
    minDistance: 0,
    maxDistance: 5,
    fee: 30,
    enabled: true,
  });

  const [notice, setNotice] = useState("");

  const updateStore = (key, value) =>
    setStore((previous) => ({ ...previous, [key]: value }));

  const updateDelivery = (key, value) =>
    setDelivery((previous) => ({ ...previous, [key]: value }));

  const updateOrderSettings = (key, value) =>
    setOrderSettings((previous) => ({ ...previous, [key]: value }));

  const updateZone = (id, key, value) => {
    setZones((previous) =>
      previous.map((zone) =>
        zone.id === id ? { ...zone, [key]: value } : zone
      )
    );
  };

  const openAddPin = () => {
    setEditingPin(null);
    setPinForm({
      pincode: "",
      area: "",
      fee: store.defaultFee,
      enabled: true,
    });
    setPinPopup(true);
  };

  const openEditPin = (pin) => {
    setEditingPin(pin.id);
    setPinForm({
      pincode: pin.pincode,
      area: pin.area,
      fee: pin.fee,
      enabled: pin.enabled,
    });
    setPinPopup(true);
  };

  const savePin = (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(pinForm.pincode)) {
      setNotice("Enter a valid 6-digit PIN code.");
      return;
    }

    if (!pinForm.area.trim() || Number(pinForm.fee) < 0) {
      setNotice("Enter the area name and a valid delivery fee.");
      return;
    }

    const duplicate = pincodes.some(
      (pin) =>
        pin.pincode === pinForm.pincode && pin.id !== editingPin
    );

    if (duplicate) {
      setNotice("This PIN code already exists.");
      return;
    }

    if (editingPin) {
      setPincodes((previous) =>
        previous.map((pin) =>
          pin.id === editingPin ? { ...pin, ...pinForm } : pin
        )
      );
    } else {
      setPincodes((previous) => [
        ...previous,
        { ...pinForm, id: Date.now() },
      ]);
    }

    setPinPopup(false);
    setNotice("PIN-code settings updated in this demo.");
  };

  const openAddZone = () => {
    setEditingZone(null);
    setZoneForm({
      name: "",
      minDistance: 0,
      maxDistance: 5,
      fee: 30,
      enabled: true,
    });
    setZonePopup(true);
  };

  const openEditZone = (zone) => {
    setEditingZone(zone.id);
    setZoneForm({ ...zone });
    setZonePopup(true);
  };

  const saveZone = (e) => {
    e.preventDefault();

    if (
      !zoneForm.name.trim() ||
      Number(zoneForm.minDistance) < 0 ||
      Number(zoneForm.maxDistance) <= Number(zoneForm.minDistance) ||
      Number(zoneForm.fee) < 0
    ) {
      setNotice("Please check the delivery zone values.");
      return;
    }

    if (editingZone) {
      setZones((previous) =>
        previous.map((zone) =>
          zone.id === editingZone ? { ...zoneForm, id: editingZone } : zone
        )
      );
    } else {
      setZones((previous) => [
        ...previous,
        { ...zoneForm, id: Date.now() },
      ]);
    }

    setZonePopup(false);
    setNotice("Delivery zone updated in this demo.");
  };

  const saveSettings = () => {
    setNotice("Settings saved in this demo only. Connect an API to persist them.");
  };

  return (
    <div className="min-h-screen bg-[#F7F8F4] lg:grid lg:grid-cols-[250px_1fr]">
      <SideBar />

      <div className="min-w-0">
        <TopBar />

        <main className="p-4 sm:p-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#64816A]">
                  ADMIN / CONFIGURATION
                </p>
                <h1 className="mt-1 text-2xl font-bold text-[#1F3827] sm:text-3xl">
                  Store Settings
                </h1>
                <p className="mt-2 text-sm text-stone-500">
                  Manage your store, delivery rules and checkout preferences.
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800">
                UI Demo
              </span>
            </div>

            {notice && (
              <div
                role="status"
                className="flex items-center justify-between gap-3 rounded-xl border border-[#D5E5D2] bg-[#EDF5E9] px-4 py-3 text-sm text-[#315C3B]"
              >
                <span>{notice}</span>
                <button
                  onClick={() => setNotice("")}
                  className="font-bold"
                  aria-label="Dismiss message"
                >
                  ×
                </button>
              </div>
            )}

            <Section
              title="Store profile"
              description="Basic information displayed to your customers."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Store name
                  <input
                    value={store.name}
                    onChange={(e) => updateStore("name", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Support email
                  <input
                    type="email"
                    value={store.email}
                    onChange={(e) => updateStore("email", e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Support phone
                  <input
                    type="tel"
                    value={store.phone}
                    onChange={(e) => updateStore("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Currency
                  <select
                    value={store.currency}
                    onChange={(e) => updateStore("currency", e.target.value)}
                    className={inputClass}
                  >
                    <option value="INR">INR (₹)</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Store / dispatch address
                  <input
                    value={store.address}
                    onChange={(e) => updateStore("address", e.target.value)}
                    placeholder="Enter your store address"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Store PIN code
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={store.storePincode}
                    onChange={(e) =>
                      updateStore(
                        "storePincode",
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      )
                    }
                    placeholder="6-digit PIN code"
                    className={inputClass}
                  />
                </label>
              </div>

              <p className="mt-4 rounded-xl bg-stone-50 p-3 text-xs leading-5 text-stone-500">
                Future integration: add a map picker here to save the store's
                latitude and longitude for distance calculations.
              </p>
            </Section>

            <Section
              title="PIN-code delivery areas"
              description="Only enabled PIN codes are eligible for delivery. Demo areas are placeholders."
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-stone-500">
                  {pincodes.filter((pin) => pin.enabled).length} active areas
                </p>
                <button onClick={openAddPin} className={buttonPrimary}>
                  + Add PIN code
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                      <th className="pb-3 pr-4">PIN code</th>
                      <th className="pb-3 pr-4">Area</th>
                      <th className="pb-3 pr-4">Fee</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pincodes.map((pin) => (
                      <tr key={pin.id} className="border-b border-stone-100">
                        <td className="py-4 pr-4 font-bold text-stone-800">
                          {pin.pincode}
                        </td>
                        <td className="py-4 pr-4 text-stone-600">
                          {pin.area}
                        </td>
                        <td className="py-4 pr-4 font-semibold">
                          ₹{pin.fee}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`rounded - full px - 2.5 py - 1 text - xs font - bold ${
   pin.enabled
      ? "bg-green-100 text-green-800"
      : "bg-stone-100 text-stone-500"
} `}
                          >
                            {pin.enabled ? "Enabled" : "Disabled"}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => openEditPin(pin)}
                              className="font-semibold text-[#315C3B] hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeletePin(pin)}
                              className="font-semibold text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section
              title="Distance-based delivery fees"
              description="Set delivery fees by distance from your store. These demo values can be edited."
            >
              <div className="mb-5 rounded-xl border border-[#DCE9C9] bg-[#F5F8EF] p-4 text-sm text-[#315C3B]">
                Distance-based rules and PIN-code eligibility work together:
                the PIN code must be serviceable and the destination must fall
                within an enabled distance zone.
              </div>

              <div className="space-y-4">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="rounded-xl border border-stone-200 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-stone-800">
                          {zone.name}
                        </h3>
                        <p className="mt-1 text-sm text-stone-500">
                          {zone.minDistance}–{zone.maxDistance} km
                          {" · "}₹{zone.fee} delivery fee
                        </p>
                      </div>

                      <button
                        onClick={() => openEditZone(zone)}
                        className={buttonSecondary}
                      >
                        Edit zone
                      </button>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <label className={labelClass}>
                        Maximum distance (km)
                        <input
                          type="number"
                          min="0.1"
                          step="0.5"
                          value={zone.maxDistance}
                          onChange={(e) =>
                            updateZone(
                              zone.id,
                              "maxDistance",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </label>

                      <label className={labelClass}>
                        Delivery fee (₹)
                        <input
                          type="number"
                          min="0"
                          value={zone.fee}
                          onChange={(e) =>
                            updateZone(zone.id, "fee", e.target.value)
                          }
                          className={inputClass}
                        />
                      </label>

                      <div className="flex items-center pt-5">
                        <Toggle
                          checked={zone.enabled}
                          onChange={(value) =>
                            updateZone(zone.id, "enabled", value)
                          }
                          title="Zone enabled"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button onClick={openAddZone} className={buttonSecondary}>
                  + Add delivery zone
                </button>

              
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Default delivery fee (₹)
                  <input
                    type="number"
                    min="0"
                    value={store.defaultFee}
                    onChange={(e) =>
                      updateStore("defaultFee", e.target.value)
                    }
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Free delivery above (₹)
                  <input
                    type="number"
                    min="0"
                    value={delivery.freeDeliveryThreshold}
                    onChange={(e) =>
                      updateDelivery("freeDeliveryThreshold", e.target.value)
                    }
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Minimum order amount (₹)
                  <input
                    type="number"
                    min="0"
                    value={delivery.minimumOrder}
                    onChange={(e) =>
                      updateDelivery("minimumOrder", e.target.value)
                    }
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Estimated delivery
                  <select
                    value={delivery.estimatedDelivery}
                    onChange={(e) =>
                      updateDelivery("estimatedDelivery", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Same day</option>
                    <option>Within 24 hours</option>
                    <option>Next day</option>
                    <option>Within 2 days</option>
                  </select>
                </label>
              </div>

              <div className="mt-5 space-y-4">
             
              </div>
            </Section>

            <Section
              title="Order and payment settings"
              description="Control the available checkout options."
            >
              <div className="space-y-5">
                <Toggle
                  checked={payments.cod}
                  onChange={(value) =>
                    setPayments((previous) => ({ ...previous, cod: value }))
                  }
                  title="Cash on Delivery"
                  description="Allow customers to pay when their order arrives."
                />

                <Toggle
                  checked={payments.online}
                  onChange={(value) =>
                    setPayments((previous) => ({
                      ...previous,
                      online: value,
                    }))
                  }
                  title="Online payments"
                  description="Enable after configuring a payment gateway and server-side payment verification."
                />

                <Toggle
                  checked={orderSettings.allowCancellation}
                  onChange={(value) =>
                    updateOrderSettings("allowCancellation", value)
                  }
                  title="Allow order cancellation"
                  description="Allow cancellation according to your order policy."
                />

                <Toggle
                  checked={orderSettings.allowReviews}
                  onChange={(value) =>
                    updateOrderSettings("allowReviews", value)
                  }
                  title="Allow product reviews"
                  description="Let customers submit product feedback."
                />

                <label className={labelClass}>
                  Low-stock alert threshold
                  <input
                    type="number"
                    min="0"
                    value={orderSettings.lowStockAlert}
                    onChange={(e) =>
                      updateOrderSettings("lowStockAlert", e.target.value)
                    }
                    className={inputClass}
                  />
                  <span className="mt-1 block text-xs font-normal text-stone-500">
                    Show a warning when product stock reaches this quantity.
                  </span>
                </label>
              </div>
            </Section>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-xs text-stone-500">
                Demo only — changes reset when the page reloads.
              </p>
              <button onClick={saveSettings} className={buttonPrimary}>
                Save settings
              </button>
            </div>
          </div>
        </main>
      </div>

      {pinPopup && (
        <Popup
          title={editingPin ? "Edit PIN code" : "Add serviceable PIN code"}
          subtitle="Configure the area and its delivery fee."
          onClose={() => setPinPopup(false)}
        >
          <form onSubmit={savePin} className="space-y-4">
            <label className={labelClass}>
              PIN code
              <input
                required
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{6}"
                value={pinForm.pincode}
                onChange={(e) =>
                  setPinForm((previous) => ({
                    ...previous,
                    pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                  }))
                }
                placeholder="Enter 6-digit PIN code"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Area / locality
              <input
                required
                value={pinForm.area}
                onChange={(e) =>
                  setPinForm((previous) => ({
                    ...previous,
                    area: e.target.value,
                  }))
                }
                placeholder="Enter area name"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Delivery fee (₹)
              <input
                required
                type="number"
                min="0"
                value={pinForm.fee}
                onChange={(e) =>
                  setPinForm((previous) => ({
                    ...previous,
                    fee: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </label>

            <Toggle
              checked={pinForm.enabled}
              onChange={(value) =>
                setPinForm((previous) => ({ ...previous, enabled: value }))
              }
              title="Enable delivery for this PIN code"
            />

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setPinPopup(false)}
                className={buttonSecondary}
              >
                Cancel
              </button>
              <button type="submit" className={buttonPrimary}>
                {editingPin ? "Save changes" : "Add PIN code"}
              </button>
            </div>
          </form>
        </Popup>
      )}

      {deletePin && (
        <Popup
          title="Delete PIN code?"
          subtitle="This only removes the PIN code from this demo list."
          onClose={() => setDeletePin(null)}
        >
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="font-bold text-stone-800">{deletePin.pincode}</p>
            <p className="mt-1 text-sm text-stone-500">{deletePin.area}</p>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setDeletePin(null)}
              className={buttonSecondary}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setPincodes((previous) =>
                  previous.filter((pin) => pin.id !== deletePin.id)
                );
                setDeletePin(null);
                setNotice("PIN code removed from this demo.");
              }}
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              Delete PIN code
            </button>
          </div>
        </Popup>
      )}

      {zonePopup && (
        <Popup
          title={editingZone ? "Edit delivery zone" : "Add delivery zone"}
          subtitle="Configure the distance range and delivery charge."
          onClose={() => setZonePopup(false)}
        >
          <form onSubmit={saveZone} className="space-y-4">
            <label className={labelClass}>
              Zone name
              <input
                required
                value={zoneForm.name}
                onChange={(e) =>
                  setZoneForm((previous) => ({
                    ...previous,
                    name: e.target.value,
                  }))
                }
                placeholder="e.g. Extended Delivery"
                className={inputClass}
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className={labelClass}>
                From (km)
                <input
                  required
                  type="number"
                  min="0"
                  step="0.5"
                  value={zoneForm.minDistance}
                  onChange={(e) =>
                    setZoneForm((previous) => ({
                      ...previous,
                      minDistance: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Up to (km)
                <input
                  required
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={zoneForm.maxDistance}
                  onChange={(e) =>
                    setZoneForm((previous) => ({
                      ...previous,
                      maxDistance: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </label>
            </div>

            <label className={labelClass}>
              Delivery fee (₹)
              <input
                required
                type="number"
                min="0"
                value={zoneForm.fee}
                onChange={(e) =>
                  setZoneForm((previous) => ({
                    ...previous,
                    fee: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </label>

            <Toggle
              checked={zoneForm.enabled}
              onChange={(value) =>
                setZoneForm((previous) => ({ ...previous, enabled: value }))
              }
              title="Enable this zone"
            />

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setZonePopup(false)}
                className={buttonSecondary}
              >
                Cancel
              </button>
              <button type="submit" className={buttonPrimary}>
                {editingZone ? "Save changes" : "Add zone"}
              </button>
            </div>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default Settings;