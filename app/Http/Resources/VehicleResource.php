<?php

namespace App\Http\Resources;

// use VehicleDocumentResource;
use App\Enums\MediaCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'plate' => $this->plate,
            'axle' => $this->axle,
            'mooc' => $this->mooc,
            'type' => $this->type,
            'parking_lot' => $this->parking_lot,
            'parking' => $this->packing,
            'chassis' => $this->chassis,
            'seri' => $this->seri,
            'note' => $this->note,
            'images' => $this->getMedia(MediaCollection::IMAGE->value),
            'addable_files' => $this->getMedia(MediaCollection::DOCUMENT->value),
            'inspection' => $this->attachmentDocument($this->vehicleInspection),
            'roadMaintenance' => $this->attachmentDocument($this->vehicleRoadMaintenance),
            'voluntaryInsurance' => $this->attachmentDocument($this->vehicleVoluntaryInsurance),
            'mandatoryInsurance' => $this->attachmentDocument($this->vehicleMandatoryInsurance),
            'roadPermit' => $this->attachmentDocument($this->vehicleRoadPermit)
        ];
    }

    function attachmentDocument($collection) {
        $documentResources = [];
        foreach ($collection as $item) {
            $documentResources[] = new VehicleDocumentResource($item);
        }

        return end($documentResources);
    }
}
