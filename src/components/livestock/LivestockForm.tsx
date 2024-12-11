import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LivestockSchema, type Livestock } from '../../types/livestock';
import { Save, X } from 'lucide-react';
import { format } from 'date-fns';

interface LivestockFormProps {
  initialData?: Partial<Livestock>;
  onSubmit: (data: Livestock) => void;
  onCancel: () => void;
}

const LivestockForm: React.FC<LivestockFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const defaultDate = initialData?.birthDate 
    ? format(new Date(initialData.birthDate), 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Livestock>({
    resolver: zodResolver(LivestockSchema),
    defaultValues: {
      ...initialData,
      weight: initialData?.weight || 0,
      cost: initialData?.cost || 0
    }
  });

  const onFormSubmit = (data: Livestock) => {
    const formattedData = {
      ...data,
      birthDate: new Date(data.birthDate)
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Species</label>
          <input
            type="text"
            {...register('species')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.species && (
            <p className="mt-1 text-sm text-red-600">{errors.species.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tag Number</label>
          <input
            type="text"
            {...register('tagNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.tagNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.tagNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Birth Date</label>
          <input
            type="date"
            defaultValue={defaultDate}
            {...register('birthDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            step="0.01"
            {...register('weight', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Health Status</label>
          <select
            {...register('healthStatus')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="healthy">Healthy</option>
            <option value="sick">Sick</option>
            <option value="quarantined">Quarantined</option>
            <option value="treatment">Under Treatment</option>
          </select>
          {errors.healthStatus && (
            <p className="mt-1 text-sm text-red-600">{errors.healthStatus.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Breeding Status</label>
          <select
            {...register('breedingStatus')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="breeding">Breeding</option>
            <option value="pregnant">Pregnant</option>
            <option value="not-breeding">Not Breeding</option>
          </select>
          {errors.breedingStatus && (
            <p className="mt-1 text-sm text-red-600">{errors.breedingStatus.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cost</label>
          <input
            type="number"
            step="0.01"
            {...register('cost', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.cost && (
            <p className="mt-1 text-sm text-red-600">{errors.cost.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default LivestockForm;